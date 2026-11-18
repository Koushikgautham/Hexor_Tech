"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "@/lib/authentication/AuthenticationContext";
import { SplashCursor } from "@/components/animations/SplashCursor";
import { ClickSpark } from "@/components/animations/ClickSpark";
import { Toaster } from "sonner";
import { ConditionalLayout } from "@/components/layout/PublicSiteLayout";

function ForceDarkModeOnPublicPages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useEffect(() => {
    // Force dark mode on main page and policy pages
    const publicPages = ["/", "/legal/privacy", "/legal/terms", "/legal/cookies"];
    if (publicPages.includes(pathname || "")) {
      setTheme("dark");
    }
  }, [pathname, setTheme]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ForceDarkModeOnPublicPages>
          <SplashCursor />
          <ClickSpark global sparkColor="var(--primary)" sparkCount={8} sparkRadius={25} duration={400} />
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </ForceDarkModeOnPublicPages>
      </AuthProvider>
    </ThemeProvider>
  );
}
