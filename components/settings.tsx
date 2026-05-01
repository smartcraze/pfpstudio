"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function SettingsComponent() {
  const { status } = useSession();
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchKey() {
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/user/key");
          if (res.ok) {
            const data = await res.json();
            setApiKey(data.key || "");
          }
        } catch (error) {
          console.error("Failed to fetch API key", error);
        } finally {
          setIsFetching(false);
        }
      } else if (status === "unauthenticated") {
        setIsFetching(false);
      }
    }
    
    fetchKey();
  }, [status]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: apiKey }),
      });

      if (res.ok) {
        toast.success("API key saved successfully");
      } else {
        toast.error("Failed to save API key");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isFetching) {
    return (
      <Card className="w-full flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bring Your Own API Key</CardTitle>
        <CardDescription>
          Provide your own remove.bg API key to bypass credit charges. By providing your own key, 
          you will not be charged credits for removing image backgrounds.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2 border text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">How to get your free API Key:</h4>
              <Button asChild variant="outline" size="sm" className="h-8 text-xs font-medium">
                <Link href="/docs">View detailed guide</Link>
              </Button>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 ml-1">
              <li>Sign up or log in at <a href="https://www.remove.bg/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">remove.bg</a></li>
              <li>Navigate to your <a href="https://www.remove.bg/dashboard#api-key" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">API Keys Dashboard</a></li>
              <li>Click on the <strong>"New API Key"</strong> button</li>
              <li>Copy the generated key and paste it in the field below</li>
            </ol>
            <p className="mt-3 text-xs border-t pt-2 border-border/50">
              <strong className="text-foreground">Bonus:</strong> remove.bg provides 50 free high-quality image previews per month for a new account!
            </p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="apiKey" className="font-medium text-base">Remove.bg API Key</Label>
            <Input 
              id="apiKey" 
              placeholder="Enter your remove.bg API key" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Get your key from <a href="https://www.remove.bg/api" target="_blank" rel="noreferrer" className="text-primary hover:underline">remove.bg</a>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
