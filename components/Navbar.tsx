'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

export const Navbar = () => {
    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50"
        >
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground">
                    P
                </div>
                <span className="font-bold text-xl tracking-tight">PfpStudio</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
                <Link href="/#showcase" className="hover:text-foreground transition-colors">Showcase</Link>
                <Link href="https://github.com" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link>
            </div>

            <div className="flex items-center gap-3">
                <Link href="/upload">
                    <Button variant="default" size="sm" className="rounded-full px-6">
                        Start Creating
                    </Button>
                </Link>
            </div>
        </motion.nav>
    )
}
