import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "@/layout-provider";

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
      <body>
        <LayoutProvider>{children}</LayoutProvider>
        <Toaster />
      </body>
    </html>
  );
}
