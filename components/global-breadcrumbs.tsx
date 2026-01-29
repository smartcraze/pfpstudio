'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import React from "react";

export function GlobalBreadcrumbs() {
    const pathname = usePathname();

    // Don't show breadcrumbs on home page
    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

    return (
        <div className="container mx-auto px-6 py-2 mt-20 mb-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {segments.length > 0 && <BreadcrumbSeparator />}

                    {segments.map((segment, index) => {
                        const isLast = index === segments.length - 1;
                        const href = `/${segments.slice(0, index + 1).join('/')}`;
                        const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

                        return (
                            <React.Fragment key={href}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{title}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator />}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
