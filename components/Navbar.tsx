"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
    Navbar as ResizableNavbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
    NavbarButton,
} from "@/components/ui/resizable-navbar";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, Coins } from "lucide-react";

export function Navbar() {
    const { data: session } = useSession();
    const navItems = [
        {
            name: "Features",
            link: "/#features",
        },
        {
            name: "Pricing",
            link: "/#pricing",
        },
        {
            name: "Contact",
            link: "/#contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const CustomLogo = () => (
        <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1">
            <Image
                src="/logo.png"
                alt="PfpStudio Logo"
                width={32}
                height={32}
                className="rounded-full"
            />
            <span className="font-bold text-xl tracking-tight text-black dark:text-white">PFP STUDIO</span>
        </Link>
    );

    return (
        <div className="relative w-full">
            <ResizableNavbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <CustomLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
                                    <Coins className="h-4 w-4 text-amber-500" />
                                    <span className="text-sm font-bold">{session.user.credits || 0}</span>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer h-9 w-9 border-2 border-background shadow-sm hover:scale-105 transition-transform">
                                            <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                                            <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer flex items-center">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="cursor-pointer text-red-600 focus:text-red-600"
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <>
                                <NavbarButton onClick={() => signIn('google')} variant="secondary">Login</NavbarButton>
                                {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
                            </>
                        )}
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <CustomLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300 py-2 block w-full"
                            >
                                <span className="block text-lg font-medium">{item.name}</span>
                            </Link>
                        ))}
                        <div className="flex w-full flex-col gap-4 mt-4">
                            {session ? (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">Credits:</span>
                                        <span className="font-bold">{session.user.credits || 0}</span>
                                    </div>
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                        <NavbarButton variant="primary" className="w-full justify-center">
                                            Dashboard
                                        </NavbarButton>
                                    </Link>
                                    <NavbarButton
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            signOut({ callbackUrl: '/' });
                                        }}
                                        variant="secondary"
                                        className="w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                    >
                                        Log out
                                    </NavbarButton>
                                </>
                            ) : (
                                <NavbarButton
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        signIn('google');
                                    }}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Login
                                </NavbarButton>
                            )}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </ResizableNavbar>
        </div>
    );
}
