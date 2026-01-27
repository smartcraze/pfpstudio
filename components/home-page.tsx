'use client'

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { HeroScrollDemo } from '@/components/HeroScroll'
import { TextHoverEffectDemo } from '@/components/TextHover'
import { IconWand, IconDownload, IconPalette, IconShare, IconCloudUpload } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Spotlight } from '@/components/ui/Spotlight'

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden selection:bg-primary/20">
            <Navbar />

            <div className="fixed inset-0 z-[-1] bg-white dark:bg-black/[0.96] antialiased">
                <div className={cn(
                    "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none hidden md:block",
                    "[background-image:linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
                )} />
            </div>

            <div className="relative pt-20 overflow-hidden">
                <div className={cn(
                    "absolute inset-0 w-full h-full hidden md:block",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
                </div>
                <Spotlight
                    className="-top-40 -left-0 md:-top-20 md:left-60"
                    fill="currentColor"
                />
                <HeroScrollDemo />
            </div>


            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/30 transform origin-top-left -z-10 h-full w-full skew-y-3" />

                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 tracking-tight">
                            Zero to Hero in <span className="text-primary">3 Steps</span>
                        </h2>
                        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
                            No sign-up required. Just upload your photo and let our studio tools do the magic.
                        </p>
                    </FadeIn>

                    <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-8 relative max-w-5xl mx-auto">
                        <StepCard
                            number="01"
                            title="Upload"
                            description="Drag & drop your best selfie. We support PNG, JPG, and WebP."
                            icon={<IconCloudUpload className="w-8 h-8" />}
                            delay={0.1}
                        />
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block pt-12 flex-1 relative w-full max-w-[100px] lg:max-w-full">
                            <div className="h-[2px] w-full bg-gradient-to-r from-border to-border via-primary/50" />
                        </div>

                        <StepCard
                            number="02"
                            title="Style"
                            description="Choose from 50+ backdrops, gradients, and decal stickers."
                            icon={<IconPalette className="w-8 h-8" />}
                            delay={0.2}
                        />

                        <div className="hidden md:block pt-12 flex-1 relative w-full max-w-[100px] lg:max-w-full">
                            <div className="h-[2px] w-full bg-gradient-to-r from-border to-border via-primary/50" />
                        </div>

                        <StepCard
                            number="03"
                            title="Export"
                            description="Download instantly in high-resolution suitable for any social platform."
                            icon={<IconDownload className="w-8 h-8" />}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Everything You Need</h2>
                            <p className="text-muted-foreground text-lg">Professional tools, zero learning curve.</p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={<IconWand className="w-8 h-8 text-primary" />}
                            title="AI Removal"
                            description="Our advanced algorithm detects subjects and removes backgrounds with precision."
                            delay={0}
                        />
                        <FeatureCard
                            icon={<IconPalette className="w-8 h-8 text-primary" />}
                            title="Smart Themes"
                            description="One-click presets designed by digital artists for maximum impact."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<IconDownload className="w-8 h-8 text-primary" />}
                            title="4K Export"
                            description="Get crisp, retina-ready images that look great on any device."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<IconShare className="w-8 h-8 text-primary" />}
                            title="Private & Secure"
                            description="All processing runs locally in your browser. Your data stays yours."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Footer / Branding */}
            <section className="py-12">
                <TextHoverEffectDemo />
            </section>

            <footer className=" py-8 bg-background/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} PfpStudio. Created for Creators.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>
        </main>
    )
}

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

function StepCard({ number, title, description, icon, delay }: { number: string, title: string, description: string, icon: React.ReactNode, delay: number }) {
    return (
        <FadeIn delay={delay} className="flex flex-col items-center text-center max-w-[280px]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 shadow-sm relative group">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative text-primary">{icon}</div>
            </div>
            <div className="text-xs font-bold text-primary/60 mb-2 uppercase tracking-widest">Step {number}</div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </FadeIn>
    )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <FadeIn delay={delay}>
            <div className="h-full flex flex-col p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="mb-5 p-3 w-fit rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </FadeIn>
    )
}
