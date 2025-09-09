import Web3Provider from "@/components/Web3Provider";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Sentra | AI Sentiment-Tracking Agent – $SNTR",
  description:
    "Sentra ($SNTR) is an AI-powered sentiment-tracking sensor that scans Twitter, news, and community activity in real time to detect FOMO, panic, and pump/dump signals — your radar for market mood shifts.",
  keywords:
    "Sentra, SNTR, AI sentiment, crypto sentiment analysis, market mood, FOMO detection, pump dump signals, community analysis, blockchain intelligence",
  authors: [{ name: "Sentra" }],
  creator: "Sentra AI",
  publisher: "Sentra Labs",
  robots: "index, follow",
  openGraph: {
    title: "Sentra | AI Sentiment-Tracking Agent – $SNTR",
    description:
      "Sentra ($SNTR) delivers real-time AI-powered sentiment tracking across Twitter, news, and communities — detecting hype, fear, and coordinated market moves before they hit the charts.",
    siteName: "Sentra – $SNTR",
    type: "website",
    images: [
      {
        url: "/og-sentra.png",
        width: 1200,
        height: 630,
        alt: "Sentra – AI Sentiment Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentra | AI Sentiment-Tracking Agent – $SNTR",
    description:
      "Sentra ($SNTR) is your AI-powered market mood radar — scanning Twitter, news, and communities in real time to detect FOMO, panic, and pump/dump signals.",
    creator: "@Sentra_AI",
    images: ["/og-sentra.png"],
  },
  viewport:
    "width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover",
  category: "cryptocurrency",
  classification:
    "AI Sentiment Agent, Cryptocurrency, Blockchain, Market Analysis, Social Signals",
  other: {
    "application-name": "Sentra AI",
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
  icons: {
    icon: "/agent/agentlogo.png",
    shortcut: "/agent/agentlogo.png",
    apple: "/agent/agentlogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <link rel="icon" href="/agent/agentlogo.png" />
        <link rel="apple-touch-icon" href="/agent/agentlogo.png" />
      </head>
      <body className="antialiased min-h-screen bg-[#0B0C10] flex flex-col">
        <Web3Provider>
        {children}
        </Web3Provider>
      </body>
    </html>
  );
}
