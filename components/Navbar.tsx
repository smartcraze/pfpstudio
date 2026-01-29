'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Plus, LogOut } from 'lucide-react'

export const Navbar = () => {
    const { data: session, status } = useSession()

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50"
        >
            <Link href="/" className="flex items-center gap-2 group">
                <Image
                    src="/logo.png"
                    alt="PfpStudio Logo"
                    width={42}
                    height={42}
                    className="transform group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="font-bold text-xl tracking-tight hidden sm:block">PFP STUDIO</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
                <Link href="/#showcase" className="hover:text-primary transition-colors">Showcase</Link>
                <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
                <Link href="https://github.com/smartcraze/pfpstudio" target="_blank" className="hover:text-primary transition-colors">GitHub</Link>
            </div>

            <div className="flex items-center gap-3">
                {status === 'loading' ? (
                    <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                ) : session ? (
                    <>
                        <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:inline-block">Credits</span>
                            <span className="text-sm font-bold">{session.user.credits || 0}</span>
                            <Link href="/#pricing">
                                <button
                                    title="Buy Credits"
                                    className="ml-1 p-0.5 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                                >
                                    <Plus className="h-3.5 w-3.5 text-green-400" />
                                </button>
                            </Link>
                        </div>

                        <div className="group relative flex items-center justify-center">
                            {session.user.image ? (
                                <Image src={session.user.image} width={36} height={36} className="rounded-full border border-border cursor-pointer hover:scale-105 transition-transform" alt="Avatar" />
                            ) : (
                                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 cursor-pointer">
                                    <span className="text-xs font-bold text-primary">{session.user.name?.[0]}</span>
                                </div>
                            )}

                            <div className="absolute top-full right-0 mt-2 w-32 bg-popover/90 backdrop-blur-md border border-border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <Button onClick={() => signIn('google', { callbackUrl: window.location.href })} variant="ghost" className="text-sm font-medium hover:bg-white/5">
                        Sign In
                    </Button>
                )}

                <Link href="/upload">
                    <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95 text-sm md:text-base">
                        Start Creating
                        <span className="ml-2 hidden sm:inline-block">→</span>
                    </Button>
                </Link>
            </div>
        </motion.nav>
    )
}
