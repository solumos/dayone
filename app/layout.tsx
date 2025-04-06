import type { Metadata } from "next";
import { Inter, PT_Mono } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const ptMono = PT_Mono({
  variable: "--font-pt-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://itsalwaysdayone.com'),
  title: "It's Always Day One",
  description: "Embrace the Day One mentality of relentless innovation, customer obsession, and bold decision-making.",
  keywords: "day one, bezos philosophy, innovation, customer obsession, startup mentality, leadership principles",
  authors: [{ name: "Day One Team" }],
  creator: "Day One Team",
  publisher: "Day One",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "It's Always Day One",
    description: "Embrace the Day One mentality of relentless innovation, customer obsession, and bold decision-making.",
    siteName: "It's Always Day One",
    url: "https://itsalwaysdayone.com",
    images: [{
      url: "/api/og",
      width: 1200,
      height: 630,
      alt: "It's Always Day One"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "It's Always Day One",
    description: "Embrace the Day One mentality of relentless innovation, customer obsession, and bold decision-making.",
    images: ["/api/og"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${ptMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
