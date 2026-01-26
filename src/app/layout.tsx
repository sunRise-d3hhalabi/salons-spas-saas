import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shey Salon & Spa (Dev)",
  description: "A modern salon and spa finder in your town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
