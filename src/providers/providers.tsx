"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "../contexts/AuthContext";
import { SplashCursor } from "@/components/animations/splash-cursor";
import { ClickSpark } from "@/components/animations/click-spark";
import { Toaster } from "sonner";
import { ConditionalLayout } from "@/components/layout/conditional-layout";

function ForceDarkModeOnPublicPages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useEffect(() => {
    // Force dark mode on main page and policy pages
    const publicPages = ["/", "/privacy", "/terms", "/cookies"];
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
