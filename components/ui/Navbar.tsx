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
            link: "/contact",
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

    const GoogleLogo = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
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
                                <NavbarButton onClick={() => signIn('google')} variant="primary" >
                                    <div className="flex items-center gap-2 shadow-lg border border-gray-200 hover:bg-gray-100">
                                        <GoogleLogo />
                                        <span>Login with Google</span>
                                    </div>
                                </NavbarButton>
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
                                    <div className="flex items-center justify-center gap-2">
                                        <GoogleLogo />
                                        <span>Login with Google</span>
                                    </div>
                                </NavbarButton>
                            )}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </ResizableNavbar>
        </div>
    );
}
