'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import Image from 'next/image'

export const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50"
        >
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="PfpStudio Logo"
                    width={42}
                    height={42}
                />
                <span className="font-bold text-xl tracking-tight">PFP STUDIO</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
                <Link href="/#showcase" className="hover:text-foreground transition-colors">Showcase</Link>
                <Link href="https://github.com/smartcraze/pfpstudio" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link>
            </div>

            <div className="flex items-center gap-3">
                <Link href="/upload">
                    <Button variant="secondary" size="sm" className="rounded-full px-6">
                        Start Creating
                    </Button>
                </Link>
            </div>
        </motion.nav>
    )
}
