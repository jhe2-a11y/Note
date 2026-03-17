import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noteflow — Transform Your Notes",
  description:
    "Turn messy notes into structured, refined, and beautifully organized outputs. A thinking amplifier, not a content generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
