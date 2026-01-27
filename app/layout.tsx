import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProfileProvider } from "@/lib/profile-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://pfpstudio.surajv.dev"),    
  title: {
    default: "PfpStudio - Create Stunning Profile Pictures",
    template: "%s | PfpStudio",
  },
  description: "Create professional animated profile pictures for social media. Remove backgrounds, add gradients, and export perfect high-quality images in seconds.",
  keywords: ["profile picture", "pfp maker", "animated profile", "background remover", "social media avatar"],
  authors: [{ name: "PfpStudio Team" }],
  creator: "PfpStudio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "PfpStudio - Create Stunning Profile Pictures",
    description: "Create professional animated profile pictures for social media. Zero design skills required.",
    siteName: "PfpStudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "PfpStudio - Create Stunning Profile Pictures",
    description: "Create professional animated profile pictures for social media. Zero design skills required.",
    creator: "@pfpstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
