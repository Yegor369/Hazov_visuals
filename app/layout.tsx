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
  return (
    <html lang="ru" style={{ width: "100%", overflowX: "hidden" }}>
      <body style={{ background: "#0A0A0B", width: "100%", overflowX: "hidden", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
