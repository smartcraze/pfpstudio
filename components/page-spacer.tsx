'use client';

import { usePathname } from "next/navigation";

export function PageSpacer() {
    const pathname = usePathname();

    // Don't add spacing on home page as it has its own padding
    if (pathname === '/') return null;

    return <div className="h-24" />; // Replaces the space previously taken by GlobalBreadcrumbs
}
