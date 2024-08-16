import { Metadata } from "next";
import { ReactNode } from "react";

const TITLE = "Free Resume Builder for Developers | resumebuilder.dev";
const DESCRIPTION = "The fastest way to build your tech resume.";
const WEBSITE_URL = "https://www.resumebuilder.dev";
const AUTHOR = "Amer Karamustafić";
const KEYWORDS = [
  "Resume builder",
  "CV creator",
  "Software engineer resume",
  "Developer resume",
  "Programmer CV",
  "Tech resume generator",
  "Professional resume templates",
  "Engineering CV builder",
  "Software developer portfolio",
  "Technical resume maker",
  "IT resume templates",
  "Coding resume builder",
  "Web developer CV",
];

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Resume Builder",
  authors: [{ name: AUTHOR, url: "https://www.malcodeman.com" }],
  generator: "Next.js",
  keywords: KEYWORDS,
  referrer: "origin",
  creator: AUTHOR,
  publisher: AUTHOR,
  icons: {
    icon: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: WEBSITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [
      {
        url: `${WEBSITE_URL}/opengraph/index.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${WEBSITE_URL}/opengraph/index.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  category: "Career Development",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
