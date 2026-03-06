'use client';

import { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';
import Link from 'next/link';

const BANNER_KEY = 'promo-banner-dismissed';

export function PromoBanner() {
    const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

    useEffect(() => {
        setDismissed(sessionStorage.getItem(BANNER_KEY) === 'true');
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem(BANNER_KEY, 'true');
        setDismissed(true);
    };

    if (dismissed) return null;

    return (
        <div className="relative bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground text-sm py-2.5 px-4 text-center z-50">
            <div className="flex items-center justify-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 shrink-0" />
                <span className="font-semibold">🎉 Limited-Time Offer:</span>
                <span>
                    Use code{' '}
                    <Link href="/#pricing" className="font-mono font-bold underline underline-offset-2 hover:no-underline">
                        SAVE25
                    </Link>{' '}
                    for <strong>25% off</strong> any plan.
                </span>
                <span className="hidden sm:inline text-primary-foreground/80">•</span>
                <span>
                    New users get{' '}
                    <Link href="/#pricing" className="font-mono font-bold underline underline-offset-2 hover:no-underline">
                        WELCOME50
                    </Link>{' '}
                    for <strong>50% off</strong>!
                </span>
            </div>
            <button
                onClick={handleDismiss}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-primary-foreground/20 transition-colors"
                aria-label="Dismiss banner"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
