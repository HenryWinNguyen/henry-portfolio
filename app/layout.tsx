// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // remove this line if you don't have app/globals.css

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
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
