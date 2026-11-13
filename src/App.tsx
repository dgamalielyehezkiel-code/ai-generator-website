import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { detectDeviceLocale, getTranslations } from './i18n';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { WorkspaceView } from './components/WorkspaceView';

export default function App() {
  const { locale, rawLanguage, dir } = useMemo(() => detectDeviceLocale(), []);
  const t = useMemo(() => getTranslations(locale), [locale]);

  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) {
      setErrorMessage(t.errorEmptyPrompt);
      return;
    }

    setErrorMessage(null);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmed,
          language: rawLanguage,
        }),
      });

      const data = (await res.json()) as {
        html?: string;
        errorCode?: string;
        error?: string;
      };

      if (!res.ok || !data.html) {
        if (data.errorCode === 'GEMINI_KEY_MISSING') {
          setErrorMessage(t.errorGeminiKey);
        } else {
          setErrorMessage(data.error || t.errorGeneric);
        }
        return;
      }

      setSubmittedPrompt(trimmed);
      setGeneratedHtml(data.html);
    } catch {
      setErrorMessage(t.errorGeneric);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePromptKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleReset = () => {
    setGeneratedHtml(null);
    setSubmittedPrompt('');
    setErrorMessage(null);
  };

  if (generatedHtml) {
    return (
      <>
        <WorkspaceView
          initialPrompt={submittedPrompt}
          html={generatedHtml}
          rawLanguage={rawLanguage}
          t={t}
          onHtmlUpdate={setGeneratedHtml}
          onReset={handleReset}
        />
        <OfflineIndicator t={t} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900">
      {/* Minimalist Top Bar */}
      <header className="w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xs">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display"
          >
            <img
              src="/icon.svg"
              alt=""
              className="h-7 w-7 rounded-lg"
              aria-hidden="true"
            />
            <span>{t.appName}</span>
          </a>

          <div className="flex items-center gap-3 shrink-0">
            <PWAInstallButton t={t} />
          </div>
        </div>
      </header>

      {/* Main Full-AI Input Canvas */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 sm:py-24">
        <div className="w-full max-w-3xl">
          <div className="text-center">
            <h1 className="font-display text-[clamp(2.1rem,4.5vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-slate-900 [text-wrap:balance]">
              {t.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 [text-wrap:balance]">
              {t.heroSubtitle}
            </p>
          </div>

          <form onSubmit={handleGenerate} className="mt-10">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all focus-within:border-[#0D9488] focus-within:ring-4 focus-within:ring-teal-500/10">
              <label htmlFor="website-prompt" className="sr-only">
                {t.heroTitle}
              </label>
              <textarea
                id="website-prompt"
                rows={7}
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                onKeyDown={handlePromptKeyDown}
                placeholder={t.promptPlaceholder}
                disabled={isGenerating}
                className="w-full resize-y min-h-[180px] rounded-t-2xl bg-transparent px-5 pt-5 pb-3 text-[15px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-60"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 px-5 py-3.5">
                <span className="text-xs text-slate-400 select-none">
                  {t.promptHint}
                </span>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488] disabled:opacity-75 cursor-pointer whitespace-nowrap shrink-0"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>{t.generatingBtn}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.generateBtn}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {isGenerating && (
              <div
                role="status"
                className="mt-5 flex items-center gap-3.5 rounded-xl border border-teal-200 bg-teal-50/70 px-5 py-4"
              >
                <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#0D9488]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{t.generatingTitle}</p>
                  <p className="mt-0.5 text-xs text-slate-600">{t.generatingSubtitle}</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </main>

      <OfflineIndicator t={t} />
    </div>
  );
}
