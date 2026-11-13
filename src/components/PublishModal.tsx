import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Globe, Loader2, X, AlertCircle } from 'lucide-react';
import type { Translations } from '../i18n';

interface PublishModalProps {
  isOpen: boolean;
  html: string;
  t: Translations;
  onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, html, t, onClose }) => {
  const [subdomain, setSubdomain] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const mapErrorCode = (code?: string, fallback?: string): string => {
    switch (code) {
      case 'NETLIFY_TOKEN_MISSING':
        return t.errorNetlifyToken;
      case 'NETLIFY_AUTH_FAILED':
        return t.errorNetlifyAuth;
      case 'SUBDOMAIN_TAKEN':
        return t.errorSubdomainTaken;
      case 'INVALID_SUBDOMAIN':
        return t.errorInvalidSubdomain;
      default:
        return fallback || t.errorGeneric;
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsPublishing(true);

    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html,
          subdomain: subdomain.trim(),
        }),
      });

      const data = (await res.json()) as {
        url?: string;
        errorCode?: string;
        error?: string;
      };

      if (!res.ok || !data.url) {
        setErrorMessage(mapErrorCode(data.errorCode, data.error));
        return;
      }

      setPublishedUrl(data.url);
    } catch {
      setErrorMessage(t.errorGeneric);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyUrl = async () => {
    if (!publishedUrl) return;
    try {
      await navigator.clipboard.writeText(publishedUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // Fallback ignored if clipboard permission unavailable
    }
  };

  const handleClose = () => {
    if (isPublishing) return;
    setPublishedUrl(null);
    setErrorMessage(null);
    setCopiedUrl(false);
    onClose();
  };

  const sanitizedPreview = subdomain
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="publish-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0D9488]">
              <Globe className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="publish-modal-title" className="text-lg font-semibold text-slate-900">
                {publishedUrl ? t.publishSuccessTitle : t.publishModalTitle}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isPublishing}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50 cursor-pointer"
            aria-label={t.closeBtn}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {publishedUrl ? (
          <div className="mt-5 space-y-5">
            <p className="text-sm text-slate-600">{t.publishSuccessDesc}</p>

            <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-3.5">
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 font-mono text-sm font-medium text-[#0F766E] hover:underline break-all"
              >
                <span>{publishedUrl}</span>
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer whitespace-nowrap"
              >
                {copiedUrl ? (
                  <>
                    <Check className="h-4 w-4 text-[#0D9488]" aria-hidden="true" />
                    <span>{t.copiedUrlBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>{t.copyUrlBtn}</span>
                  </>
                )}
              </button>
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] whitespace-nowrap"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>{t.openLiveSiteBtn}</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePublish} className="mt-4 space-y-5">
            <p className="text-sm leading-relaxed text-slate-600">{t.publishModalDesc}</p>

            <div>
              <label htmlFor="subdomain-input" className="block text-sm font-medium text-slate-800">
                {t.subdomainLabel}
              </label>
              <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50/50 focus-within:border-[#0D9488] focus-within:bg-white focus-within:ring-3 focus-within:ring-teal-500/15 transition-all">
                <input
                  id="subdomain-input"
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  placeholder={t.subdomainPlaceholder}
                  disabled={isPublishing}
                  className="w-full bg-transparent px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-mono"
                />
                <span className="shrink-0 pr-3.5 text-xs font-mono text-slate-500 select-none">
                  .netlify.app
                </span>
              </div>
              {sanitizedPreview && (
                <p className="mt-1.5 text-xs font-mono text-[#0F766E]">
                  https://{sanitizedPreview}.netlify.app
                </p>
              )}
              <p className="mt-1.5 text-xs text-slate-500">{t.subdomainHint}</p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-800"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPublishing}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {t.publishCancelBtn}
              </button>
              <button
                type="submit"
                disabled={isPublishing}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] disabled:opacity-70 cursor-pointer whitespace-nowrap"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>{t.publishingBtn}</span>
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    <span>{t.publishConfirmBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
