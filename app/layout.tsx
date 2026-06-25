import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAZOV VISUALS — видео, сайты, боты",
  description: "Делаю так, чтобы вас заметили. Видео, сайты, Telegram-боты — на нейросетях, быстро.",
  icons: {
    icon: "/assets/logo-mark.png",
  },
  openGraph: {
    title: "HAZOV VISUALS — видео, сайты, боты",
    description: "Делаю так, чтобы вас заметили. Видео, сайты, Telegram-боты — на нейросетях, быстро.",
    url: "https://hazovvisuals.ru",
    siteName: "HAZOV VISUALS",
    images: [
      {
        url: "https://hazovvisuals.ru/assets/logo.png",
        alt: "HAZOV VISUALS",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAZOV VISUALS — видео, сайты, боты",
    description: "Делаю так, чтобы вас заметили. Видео, сайты, Telegram-боты — на нейросетях, быстро.",
    images: ["https://hazovvisuals.ru/assets/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "HAZOV VISUALS",
    description: "Видео, сайты, Telegram-боты для бизнеса. Быстро, на нейросетях.",
    url: "https://hazovvisuals.ru",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://t.me/hazov_visuals_bot",
    },
    sameAs: ["https://t.me/hazov_visuals"],
    priceRange: "₽₽",
  };

  return (
    <html lang="ru" style={{ width: "100%", overflowX: "hidden" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ background: "#0A0A0B", width: "100%", overflowX: "hidden", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
