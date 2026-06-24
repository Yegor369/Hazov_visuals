import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAZOV VISUALS — видео, сайты, боты",
  description: "Делаю так, чтобы вас заметили. Видео, сайты, Telegram-боты — на нейросетях, быстро.",
  icons: {
    icon: "/assets/logo-mark.png",
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
