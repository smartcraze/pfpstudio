import React from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Contact PfpStudio support',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Have questions about our service, pricing, or need technical support? We're here to help.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Get in Touch</CardTitle>
                            <CardDescription>
                                Fill out the form and we'll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                                        <Input id="first-name" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                                </div>
                                <Button type="button" className="w-full">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <div className="grid gap-6">
                        <Card>
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Email Us</h3>
                                    <p className="text-sm text-muted-foreground mb-2">Our friendly team is here to help.</p>
                                    <a href="mailto:support@pfpstudio.surajv.dev" className="text-primary hover:underline font-medium">
                                        support@pfpstudio.surajv.dev
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
