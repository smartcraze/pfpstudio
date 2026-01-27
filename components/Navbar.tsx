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
                <Link href="https://github.com/smartcraze/pfpstudio" target="_blank" className="hover:text-primary transition-colors">GitHub</Link>
            </div>

            <div className="flex items-center gap-3">
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
