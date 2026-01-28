import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hexor | Digital Transformation for MSMEs",
    template: "%s | Hexor",
  },
  description:
    "Empowering MSMEs with cutting-edge digital transformation solutions. We provide automation, ecommerce management, and social media services to help your business thrive.",
  keywords: [
    "digital transformation",
    "MSME",
    "automation",
    "ecommerce",
    "social media management",
    "business solutions",
  ],
  authors: [{ name: "Hexor" }],
  creator: "Hexor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hexora.com",
    siteName: "Hexor",
    title: "Hexor | Digital Transformation for MSMEs",
    description:
      "Empowering MSMEs with cutting-edge digital transformation solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexor | Digital Transformation for MSMEs",
    description:
      "Empowering MSMEs with cutting-edge digital transformation solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
