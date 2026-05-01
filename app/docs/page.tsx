import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
              <p className="text-muted-foreground mt-2">Learn how to get your own Remove.bg API key to bypass credit charges.</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <span className="flex items-center justify-center bg-primary text-primary-foreground w-8 h-8 rounded-full text-lg">1</span>
                  Go to Remove.bg API Page
                </CardTitle>
                <CardDescription className="text-base">
                  First, navigate to the <a href="https://www.remove.bg/api" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium inline-flex items-center">Remove.bg API documentation <ExternalLink className="w-3 h-3 ml-1" /></a> page and click the <strong>"Get API Key"</strong> button.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden relative aspect-[16/9] w-full max-w-3xl mx-auto flex justify-center bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/docs/first.png" 
                    alt="Remove.bg API Page" 
                    className="object-contain w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <span className="flex items-center justify-center bg-primary text-primary-foreground w-8 h-8 rounded-full text-lg">2</span>
                  Log In or Sign Up
                </CardTitle>
                <CardDescription className="text-base">
                  You will be prompted to log in to your Kaleido Account. If you don't have an account, click to <strong>Sign up</strong> for free. A new account offers 50 free high-quality image previews!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden relative aspect-[16/9] w-full max-w-3xl mx-auto flex justify-center bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/docs/second.png" 
                    alt="Remove.bg Login Page" 
                    className="object-contain w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <span className="flex items-center justify-center bg-primary text-primary-foreground w-8 h-8 rounded-full text-lg">3</span>
                  Navigate to API Keys Dashboard
                </CardTitle>
                <CardDescription className="text-base">
                  Once logged in, go to the <a href="https://www.remove.bg/dashboard#api-key" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium inline-flex items-center">API Keys tab <ExternalLink className="w-3 h-3 ml-1" /></a> in your dashboard. Click the <strong>"New API Key"</strong> button to generate your free key. Copy this key.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden relative aspect-[21/9] w-full max-w-3xl mx-auto flex justify-center bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/docs/third.png" 
                    alt="Remove.bg Dashboard API Keys Tab" 
                    className="object-contain w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <span className="flex items-center justify-center bg-primary text-primary-foreground w-8 h-8 rounded-full text-lg">4</span>
                  Paste Key in Your App Dashboard
                </CardTitle>
                <CardDescription className="text-base">
                  Finally, return to our <Link href="/dashboard" className="text-primary hover:underline font-medium">Dashboard</Link>, paste your new key into the <strong>"Bring Your Own API Key"</strong> section, and click <strong>Save Changes</strong>. You will no longer be charged credits for removing backgrounds!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
