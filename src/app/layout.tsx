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
    "web development",
    "digital marketing",
    "Chennai digital agency",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
