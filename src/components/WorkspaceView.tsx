import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Globe,
  Loader2,
  MessageSquare,
  Monitor,
  Send,
  Smartphone,
  Tablet,
  Eye,
} from 'lucide-react';
import type { Translations } from '../i18n';
import { PWAInstallButton } from './PWAInstallButton';
import { PublishModal } from './PublishModal';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';
type MobilePane = 'preview' | 'chat';

interface WorkspaceViewProps {
  initialPrompt: string;
  html: string;
  rawLanguage: string;
  t: Translations;
  onHtmlUpdate: (newHtml: string) => void;
  onReset: () => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  initialPrompt,
  html,
  rawLanguage,
  t,
  onHtmlUpdate,
  onReset,
}) => {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [mobilePane, setMobilePane] = useState<MobilePane>('preview');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init-user', role: 'user', content: initialPrompt },
    { id: 'init-ai', role: 'assistant', content: t.chatInitialAssistant },
  ]);
  const [revisionInput, setRevisionInput] = useState('');
  const [isRevising, setIsRevising] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isRevising]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopiedCode(true);
      showToast(t.toastCopied);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Clipboard fallback via hidden textarea
      const el = document.createElement('textarea');
      el.value = html;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedCode(true);
      showToast(t.toastCopied);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(t.toastDownloaded);
  };

  const handleSendRevision = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const instruction = revisionInput.trim();
    if (!instruction || isRevising) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: instruction,
    };

    setMessages((prev) => [...prev, userMsg]);
    setRevisionInput('');
    setIsRevising(true);

    try {
      const res = await fetch('/api/revise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentHtml: html,
          instruction,
          language: rawLanguage,
        }),
      });

      const data = (await res.json()) as {
        html?: string;
        errorCode?: string;
        error?: string;
      };

      if (!res.ok || !data.html) {
        const errText =
          data.errorCode === 'GEMINI_KEY_MISSING'
            ? t.errorGeminiKey
            : data.error || t.chatRevisionError;
        setMessages((prev) => [
          ...prev,
          { id: `err-${Date.now()}`, role: 'error', content: errText },
        ]);
        return;
      }

      onHtmlUpdate(data.html);
      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: 'assistant', content: t.chatRevisionSuccess },
      ]);
      // On mobile, switch back to preview automatically so the user sees the update
      setMobilePane('preview');
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, role: 'error', content: t.chatRevisionError },
      ]);
    } finally {
      setIsRevising(false);
    }
  };

  const handleRevisionKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendRevision();
    }
  };

  const previewFrameClass =
    device === 'desktop'
      ? 'w-full h-full bg-white'
      : device === 'tablet'
        ? 'w-[768px] max-w-full h-full bg-white rounded-xl border border-slate-200 shadow-sm'
        : 'w-[375px] max-w-full h-full bg-white rounded-[24px] border border-slate-200 shadow-sm';

  return (
    <div className="flex h-screen flex-col bg-[#FAFAFA] text-slate-900 overflow-hidden">
      {/* Top Export & Publish Toolbar */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 lg:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.newWebsiteBtn}</span>
          </button>
          <span className="hidden sm:inline-block h-4 w-px bg-slate-200 shrink-0" aria-hidden="true" />
          <p className="hidden md:block truncate text-xs text-slate-500 max-w-xs lg:max-w-md">
            {initialPrompt}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block">
            <PWAInstallButton t={t} />
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copiedCode ? (
              <Check className="h-3.5 w-3.5 text-[#0D9488]" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">
              {copiedCode ? t.copiedCodeBtn : t.copyCodeBtn}
            </span>
          </button>

          <button
            type="button"
            onClick={handleDownloadHtml}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t.downloadHtmlBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPublishOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0F766E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.publishBtn}</span>
          </button>
        </div>
      </header>

      {/* Mobile View Switcher (visible below lg) */}
      <div className="flex lg:hidden items-center gap-1 border-b border-slate-200 bg-white px-4 py-2 shrink-0">
        <button
          type="button"
          onClick={() => setMobilePane('preview')}
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            mobilePane === 'preview'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t.deviceDesktop}</span>
        </button>
        <button
          type="button"
          onClick={() => setMobilePane('chat')}
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            mobilePane === 'chat'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t.chatTitle}</span>
        </button>
      </div>

      {/* Main Split Workspace */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Panel: AI Revision Chat */}
        <aside
          className={`${
            mobilePane === 'chat' ? 'flex w-full' : 'hidden'
          } lg:flex lg:w-[360px] xl:w-[400px] shrink-0 flex-col border-r border-slate-200 bg-white`}
        >
          <div className="border-b border-slate-100 px-5 py-4 shrink-0">
            <h2 className="text-sm font-semibold text-slate-900">{t.chatTitle}</h2>
            <p className="mt-0.5 text-xs text-slate-500">{t.chatSubtitle}</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-br-sm'
                      : msg.role === 'error'
                        ? 'border border-red-200 bg-red-50 text-red-800 rounded-bl-sm'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isRevising && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-600">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0D9488]" aria-hidden="true" />
                  <span>{t.chatRevisingStatus}</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendRevision} className="border-t border-slate-200 bg-white p-3.5 shrink-0">
            <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/50 focus-within:border-[#0D9488] focus-within:bg-white focus-within:ring-3 focus-within:ring-teal-500/10 transition-all">
              <textarea
                rows={3}
                value={revisionInput}
                onChange={(e) => setRevisionInput(e.target.value)}
                onKeyDown={handleRevisionKeyDown}
                placeholder={t.chatPlaceholder}
                disabled={isRevising}
                className="w-full resize-none bg-transparent px-3.5 pt-3 pb-2 text-xs leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-60"
              />
              <div className="flex items-center justify-end px-2.5 pb-2.5">
                <button
                  type="submit"
                  disabled={!revisionInput.trim() || isRevising}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-40 cursor-pointer whitespace-nowrap"
                >
                  {isRevising ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span>{t.chatSendBtn}</span>
                </button>
              </div>
            </div>
          </form>
        </aside>

        {/* Right Panel: Live Preview + Device Switcher */}
        <section
          className={`${
            mobilePane === 'preview' ? 'flex' : 'hidden'
          } lg:flex flex-1 flex-col min-w-0 bg-slate-100/80`}
        >
          {/* Device Switcher Bar */}
          <div className="flex h-12 shrink-0 items-center justify-center border-b border-slate-200 bg-white/80 backdrop-blur-xs px-4">
            <div
              role="tablist"
              aria-label="Viewport size"
              className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={device === 'desktop'}
                onClick={() => setDevice('desktop')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  device === 'desktop'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.deviceDesktop}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={device === 'tablet'}
                onClick={() => setDevice('tablet')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  device === 'tablet'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tablet className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.deviceTablet}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={device === 'mobile'}
                onClick={() => setDevice('mobile')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  device === 'mobile'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.deviceMobile}</span>
              </button>
            </div>
          </div>

          {/* Live Iframe Container */}
          <div className="flex-1 min-h-0 overflow-auto p-3 sm:p-5 flex items-center justify-center">
            <div className={`${previewFrameClass} overflow-hidden transition-all duration-200`}>
              <iframe
                title="Live Website Preview"
                srcDoc={html}
                sandbox="allow-scripts allow-forms allow-modals allow-popups"
                className="h-full w-full border-0 bg-white"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Publish Modal */}
      <PublishModal
        isOpen={isPublishOpen}
        html={html}
        t={t}
        onClose={() => setIsPublishOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-lg"
        >
          <Check className="h-3.5 w-3.5 text-teal-400" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
