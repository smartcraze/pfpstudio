import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for PfpStudio',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8 text-foreground/90">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using PfpStudio ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                    <p>
                        PfpStudio provides tools for users to upload, edit, and modify profile pictures using AI-powered background removal and image processing technologies.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. User Accounts and Credits</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>You may need to create an account to access certain features.</li>
                        <li>New users may receive free credits to try the Service.</li>
                        <li>Additional credits can be purchased. Credits are consumable and deducted when downloading high-quality images.</li>
                        <li>Credits are non-refundable once purchased, except as required by law.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
                    <p>
                        You retain all rights to the images you upload. By uploading images, you grant PfpStudio a temporary license to process and display them for the purpose of providing the Service. We do not claim ownership of your content.
                    </p>
                    <p className="mt-2">
                        You agree not to upload content that is illegal, offensive, or violates the rights of others.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Privacy</h2>
                    <p>
                        Your use of the Service is also governed by our Privacy Policy. Please review it to understand how we collect and use your information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                    <p>
                        PfpStudio is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service, including but not limited to loss of data or service interruptions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Continued use of the Service constitutes acceptance of the updated terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
                    <p>
                        For any questions regarding these Terms, please contact us at support@pfpstudio.surajv.dev.
                    </p>
                </section>
            </div>
        </div>
    );
}
