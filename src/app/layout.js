import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Fonts
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-spacegrotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Quantora | Expert AI Research Agent – $QTRA",
  description:
    "Quantora ($QTRA) is an expert-level AI research agent for fundamental analysis. It generates deep reports on tokenomics, unlocks, VC backing, and market psychology — built for serious crypto investors.",
  keywords:
    "Quantora, QTRA, AI research, crypto analysis, tokenomics, unlock schedule, VC backing, market psychology, fundamental analysis, blockchain intelligence",
  authors: [{ name: "Quantora" }],
  creator: "Quantora AI",
  publisher: "Quantora Labs",
  robots: "index, follow",
  openGraph: {
    title: "Quantora | Expert AI Research Agent – $QTRA",
    description:
      "Quantora ($QTRA) delivers AI-powered research with tokenomics, unlocks, VC analysis, and market psychology insights — for pro-level investors.",
    siteName: "Quantora – $QTRA",
    type: "website",
    images: [
      {
        url: "/og-quantora.png",
        width: 1200,
        height: 630,
        alt: "Quantora – AI Research Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantora | Expert AI Research Agent – $QTRA",
    description:
      "Quantora ($QTRA) is your AI-powered research analyst for tokenomics, unlocks, VC insights, and market psychology.",
    creator: "@Quantora_AI",
    images: ["/og-quantora.png"],
  },
  viewport:
    "width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover",
  category: "cryptocurrency",
  classification:
    "AI Research Agent, Cryptocurrency, Blockchain, Fundamental Analysis",
  other: {
    "application-name": "Quantora AI",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} antialiased min-h-screen bg-[#0B0C10] flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
