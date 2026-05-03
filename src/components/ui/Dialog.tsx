"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type DialogVariant = "info" | "success" | "warning" | "error";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variant?: DialogVariant;
  /** Primary action button */
  confirmLabel?: string;
  onConfirm?: () => void;
  /** Secondary / cancel button */
  cancelLabel?: string;
  /** Whether to show the cancel button */
  showCancel?: boolean;
  children?: React.ReactNode;
}

const VARIANT_CONFIG: Record<
  DialogVariant,
  { bg: string; icon: string; headerBg: string; headerText: string }
> = {
  info: {
    bg: "bg-white",
    icon: "info",
    headerBg: "bg-black",
    headerText: "text-white",
  },
  success: {
    bg: "bg-white",
    icon: "check_circle",
    headerBg: "bg-[#FFD600]",
    headerText: "text-black",
  },
  warning: {
    bg: "bg-white",
    icon: "warning",
    headerBg: "bg-[#FFD600]",
    headerText: "text-black",
  },
  error: {
    bg: "bg-white",
    icon: "error",
    headerBg: "bg-red-500",
    headerText: "text-white",
  },
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  variant = "info",
  confirmLabel = "OK",
  onConfirm,
  cancelLabel = "Batal",
  showCancel = false,
  children,
}: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cfg = VARIANT_CONFIG[variant];

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    else onClose();
  };

  const modal = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Panel */}
      <div
        className={`relative w-full max-w-2xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${cfg.bg} overflow-hidden`}
        style={{ animation: "dialogPop 0.25s cubic-bezier(0.34,1.56,0.64,1) both" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {/* Header */}
        <div className={`relative ${cfg.headerBg} ${cfg.headerText} px-6 py-5 flex items-center gap-4 border-b-4 border-black overflow-hidden`}>
          {/* Subtle grid decoration for header */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <span className="relative z-10 material-symbols-outlined text-[28px] shrink-0">{cfg.icon}</span>
          <h2 id="dialog-title" className="relative z-10 font-black uppercase tracking-tighter text-lg flex-1">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="relative z-10 p-1 border-2 border-transparent hover:border-current transition-colors opacity-80 hover:opacity-100"
            aria-label="Tutup"
          >
            <span className="material-symbols-outlined text-[24px] block">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {description && (
            <p className="text-zinc-800 font-bold leading-relaxed text-base mb-6">{description}</p>
          )}
          {children}
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-4 justify-end">
          {showCancel && (
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white text-black font-black uppercase text-sm tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`px-8 py-3 font-black uppercase text-sm tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all ${variant === "error"
                ? "bg-red-500 text-white"
                : variant === "success"
                  ? "bg-[#FFD600] text-black"
                  : "bg-black text-white"
              }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );

  // Render via portal so it's always on top
  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
}
