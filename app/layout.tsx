// app/layout.tsx
import type { Metadata } from "next";

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
    images: ["/og.png"],           // optional; add later if you want
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Nguyen",
    description:
      "CS @ UTD — software, AI, and data-driven development.",
    images: ["/og.png"],           // optional
  },
};
