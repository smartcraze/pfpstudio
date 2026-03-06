"use client";

import { X, Tag, Sparkles } from "lucide-react";

interface PromoBannerProps {
    onDismiss: () => void;
}

export function PromoBanner({ onDismiss }: PromoBannerProps) {
    return (
        <div className="w-full bg-violet-600 text-white flex items-center justify-center px-10 py-2 text-sm relative min-h-10">
            {/* min-h-10 (40px) must match the 'top-10' offset applied to the navbar in Navbar.tsx */}
            <Tag className="w-3.5 h-3.5 mr-2 shrink-0" />
            <Sparkles className="w-3.5 h-3.5 mr-2 shrink-0" />
            <p className="text-center leading-snug">
                <span className="font-semibold">Limited-Time Offer:</span>{" "}
                Use code{" "}
                <span className="font-mono font-bold bg-white/20 px-1 py-0.5 rounded">SAVE25</span>{" "}
                for <span className="font-bold">25% off</span> any plan.{" "}
                <span className="mx-1">•</span>{" "}
                New users get{" "}
                <span className="font-mono font-bold bg-white/20 px-1 py-0.5 rounded">WELCOME50</span>{" "}
                for <span className="font-bold">50% off!</span>
            </p>
            <button
                onClick={onDismiss}
                className="absolute right-4 p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Dismiss banner"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
