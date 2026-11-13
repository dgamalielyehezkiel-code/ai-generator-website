import 'dotenv/config';
import http from 'node:http';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '5mb' }));

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function cleanHtmlOutput(raw: string): string {
  let cleaned = raw.trim();

  // Strip wrapping markdown code fences if the model included them
  const fenceMatch = cleaned.match(/^```(?:html)?\s*\n?([\s\S]*?)\n?```$/i);
  if (fenceMatch && fenceMatch[1]) {
    cleaned = fenceMatch[1].trim();
  } else {
    cleaned = cleaned
      .replace(/^```(?:html)?\s*\n?/i, '')
      .replace(/\n?```\s*$/i, '')
      .trim();
  }

  // Extract from <!DOCTYPE html> or <html to </html> if any stray text surrounds it
  const doctypeIdx = cleaned.search(/<!doctype\s+html/i);
  const htmlStartIdx = doctypeIdx !== -1 ? doctypeIdx : cleaned.search(/<html[\s>]/i);
  const htmlEndIdx = cleaned.toLowerCase().lastIndexOf('</html>');

  if (htmlStartIdx !== -1 && htmlEndIdx !== -1 && htmlEndIdx > htmlStartIdx) {
    cleaned = cleaned.slice(htmlStartIdx, htmlEndIdx + '</html>'.length).trim();
  }

  return cleaned;
}

const GENERATE_SYSTEM_INSTRUCTION = `You are a senior frontend architect and visual designer.
Your sole task is to generate a complete, production-ready, single-file HTML5 website from scratch based on the user's request.

STRICT OUTPUT RULES:
1. Return ONLY raw, valid HTML5 code starting with <!DOCTYPE html> and ending with </html>.
2. NEVER wrap the response in markdown code fences (\`\`\`html or \`\`\`), and NEVER include any introductory or closing explanation text.
3. Include Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script> in <head>, along with appropriate Google Fonts (<link>) for the requested brand/domain.
4. Design & Layout Quality:
   - Build a completely responsive layout across Mobile, Tablet, and Desktop viewports.
   - Craft a distinctive, tasteful, high-contrast aesthetic tailored to the exact subject matter (typography, color palette, spacing, grid structure).
   - Ensure every navigation link, button, tab, accordion, mobile hamburger menu, modal, or contact/newsletter form works interactively using clean vanilla JavaScript inside a <script> tag before </body>.
   - Do NOT use broken external image URLs (such as via.placeholder.com, picsum.photos, or unverified image links). For visual assets, icons, diagrams, and hero artwork, create crisp inline SVGs, geometric patterns, and styled CSS compositions that always render cleanly.
5. Language: Write all website copy, headings, labels, navigation, and interactive feedback in the same language as the user's prompt (or the provided fallback locale if the prompt is language-neutral).`;

const REVISE_SYSTEM_INSTRUCTION = `You are a senior frontend architect and visual designer updating an existing single-file HTML5 website.

STRICT OUTPUT RULES:
1. Apply the user's requested revision accurately (changing colors, typography, layout, copy, adding or removing sections, or enhancing interactivity) while preserving the overall quality, responsiveness, Tailwind CSS CDN setup, and working JavaScript of the existing site.
2. Return ONLY the complete, updated raw HTML5 code starting with <!DOCTYPE html> and ending with </html>.
3. NEVER wrap the output in markdown code fences (\`\`\`html or \`\`\`), and NEVER output partial snippets, diffs, or commentary outside the HTML document.`;

app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, language } = req.body as { prompt?: string; language?: string };

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      res.status(400).json({ errorCode: 'EMPTY_PROMPT', error: 'Prompt is required.' });
      return;
    }

    const ai = getGeminiClient();
    const userMessage = `User website request:\n${prompt.trim()}\n\nFallback UI language if prompt language is ambiguous: ${language || 'en'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: userMessage,
      config: {
        systemInstruction: GENERATE_SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
      },
    });

    const rawText = response.text ?? '';
    const html = cleanHtmlOutput(rawText);

    if (!html || !html.toLowerCase().includes('<html')) {
      res.status(502).json({
        errorCode: 'INVALID_GENERATION',
        error: 'The AI did not return a valid HTML document. Please try again.',
      });
      return;
    }

    res.json({ html });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error in /api/generate:', err);

    if (message === 'GEMINI_API_KEY_MISSING') {
      res.status(503).json({
        errorCode: 'GEMINI_KEY_MISSING',
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    res.status(500).json({
      errorCode: 'GENERATION_FAILED',
      error: message,
    });
  }
});

app.post('/api/revise', async (req: Request, res: Response) => {
  try {
    const { currentHtml, instruction, language } = req.body as {
      currentHtml?: string;
      instruction?: string;
      language?: string;
    };

    if (!currentHtml || typeof currentHtml !== 'string' || !instruction || typeof instruction !== 'string' || !instruction.trim()) {
      res.status(400).json({ errorCode: 'INVALID_REVISION_INPUT', error: 'Both currentHtml and instruction are required.' });
      return;
    }

    const ai = getGeminiClient();
    const userMessage = `Current HTML5 website:\n${currentHtml}\n\nRequested revision (reply/copy language hint: ${language || 'en'}):\n${instruction.trim()}`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: userMessage,
      config: {
        systemInstruction: REVISE_SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const rawText = response.text ?? '';
    const html = cleanHtmlOutput(rawText);

    if (!html || !html.toLowerCase().includes('<html')) {
      res.status(502).json({
        errorCode: 'INVALID_GENERATION',
        error: 'The AI did not return a valid HTML document. Please try again.',
      });
      return;
    }

    res.json({ html });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error in /api/revise:', err);

    if (message === 'GEMINI_API_KEY_MISSING') {
      res.status(503).json({
        errorCode: 'GEMINI_KEY_MISSING',
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    res.status(500).json({
      errorCode: 'REVISION_FAILED',
      error: message,
    });
  }
});

app.post('/api/publish', async (req: Request, res: Response) => {
  try {
    const { html, subdomain } = req.body as { html?: string; subdomain?: string };

    if (!html || typeof html !== 'string' || !html.trim()) {
      res.status(400).json({ errorCode: 'EMPTY_HTML', error: 'HTML content is required.' });
      return;
    }

    const token = process.env.NETLIFY_ACCESS_TOKEN;
    if (!token) {
      res.status(503).json({
        errorCode: 'NETLIFY_TOKEN_MISSING',
        error: 'NETLIFY_ACCESS_TOKEN is not configured on the server.',
      });
      return;
    }

    let cleanSubdomain = '';
    if (typeof subdomain === 'string' && subdomain.trim().length > 0) {
      cleanSubdomain = subdomain
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (cleanSubdomain.length < 3) {
        res.status(400).json({
          errorCode: 'INVALID_SUBDOMAIN',
          error: 'Subdomain must be at least 3 alphanumeric characters.',
        });
        return;
      }
    }

    // Wrap generated HTML into index.html inside a ZIP archive using JSZip
    const zip = new JSZip();
    zip.file('index.html', html);
    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    let siteData: { id?: string; name?: string; ssl_url?: string; url?: string } = {};
    let deployData: { ssl_url?: string; deploy_ssl_url?: string; url?: string; name?: string } = {};

    if (cleanSubdomain) {
      // 1. Create site with requested subdomain name
      const createSiteRes = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: cleanSubdomain }),
      });

      if (!createSiteRes.ok) {
        const errBody = await createSiteRes.text();
        if (createSiteRes.status === 422) {
          res.status(409).json({
            errorCode: 'SUBDOMAIN_TAKEN',
            error: `Subdomain "${cleanSubdomain}.netlify.app" is already taken or unavailable.`,
          });
          return;
        }
        if (createSiteRes.status === 401 || createSiteRes.status === 403) {
          res.status(401).json({
            errorCode: 'NETLIFY_AUTH_FAILED',
            error: 'Netlify authentication failed. Please check NETLIFY_ACCESS_TOKEN.',
          });
          return;
        }
        res.status(createSiteRes.status).json({
          errorCode: 'PUBLISH_FAILED',
          error: errBody || 'Failed to create Netlify site.',
        });
        return;
      }

      siteData = (await createSiteRes.json()) as typeof siteData;

      // 2. Deploy ZIP to the created site
      const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}/deploys`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/zip',
        },
        body: new Uint8Array(zipBuffer),
      });

      if (!deployRes.ok) {
        const errBody = await deployRes.text();
        res.status(deployRes.status).json({
          errorCode: 'PUBLISH_FAILED',
          error: errBody || 'Failed to deploy ZIP to Netlify.',
        });
        return;
      }

      deployData = (await deployRes.json()) as typeof deployData;
    } else {
      // Create a random-named site and deploy the ZIP directly in one request
      const deployRes = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/zip',
        },
        body: new Uint8Array(zipBuffer),
      });

      if (!deployRes.ok) {
        const errBody = await deployRes.text();
        if (deployRes.status === 401 || deployRes.status === 403) {
          res.status(401).json({
            errorCode: 'NETLIFY_AUTH_FAILED',
            error: 'Netlify authentication failed. Please check NETLIFY_ACCESS_TOKEN.',
          });
          return;
        }
        res.status(deployRes.status).json({
          errorCode: 'PUBLISH_FAILED',
          error: errBody || 'Failed to publish to Netlify.',
        });
        return;
      }

      siteData = (await deployRes.json()) as typeof siteData;
    }

    const siteName = siteData.name || deployData.name || cleanSubdomain;
    const liveUrl =
      deployData.ssl_url ||
      siteData.ssl_url ||
      (siteName ? `https://${siteName}.netlify.app` : deployData.deploy_ssl_url || siteData.url);

    res.json({
      url: liveUrl,
      siteName,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error in /api/publish:', err);
    res.status(500).json({
      errorCode: 'PUBLISH_FAILED',
      error: message,
    });
  }
});

async function startServer() {
  const httpServer = http.createServer(app);
  const hmrDisabled = process.env.DISABLE_HMR === 'true';

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: hmrDisabled ? false : { server: httpServer },
        ws: hmrDisabled ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
