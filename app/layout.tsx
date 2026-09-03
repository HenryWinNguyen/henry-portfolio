// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // remove this line if you don't have app/globals.css

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Henry Nguyen",
    template: "%s • Henry Nguyen",
  },
  description:
    "CS @ UTD — software, AI, and data-driven development (projects, experience, contact).",
  metadataBase: new URL("https://henry-nguyen.dev"),
  openGraph: {
    title: "Henry Nguyen",
    description:
      "CS @ UTD — software, AI, and data-driven development.",
    url: "https://henry-nguyen.dev",
    siteName: "Henry Nguyen",
    locale: "en_US",
    type: "website",
    // images: ["/og.png"], // optional: add public/og.png or leave this commented
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Nguyen",
    description:
      "CS @ UTD — software, AI, and data-driven development.",
    // images: ["/og.png"], // optional
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-surface text-ink antialiased font-sans`}
      >
        <div aria-hidden className="grain-overlay pointer-events-none fixed inset-0 z-[999]" />
        {children}
      </body>
    </html>
  );
}
