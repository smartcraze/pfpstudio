import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for PfpStudio',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8 text-foreground/90">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, upload images, or contact us.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li><strong>Account Information:</strong> Name, email address, and profile picture (from Google Sign-In).</li>
                        <li><strong>User Content:</strong> Images you upload for processing.</li>
                        <li><strong>Payment Information:</strong> Transaction details (we do not store full credit card numbers; payments are processed by Razorpay).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Provide, maintain, and improve our services.</li>
                        <li>Process your uploads and generate profile pictures.</li>
                        <li>Process transactions and manage your credits.</li>
                        <li>Send you technical notices and support messages.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Image Processing</h2>
                    <p>
                        Images uploaded for background removal are processed securely. We do not use your images for training AI models without your explicit consent. Images may be temporarily stored to allow you to edit and download them.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Sharing of Information</h2>
                    <p>
                        We do not share your personal information with third parties except as described in this policy (e.g., with payment processors like Razorpay) or as required by law.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                    <p>
                        We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                    <p>
                        You can access and update your account information at any time. You may also contact us to request deletion of your data.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at support@pfpstudio.surajv.dev.
                    </p>
                </section>
            </div>
        </div>
    );
}
