import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { RightClickPreventer } from "@/components/ui/right-click-preventer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flaminco | Advertising Agency",
  description: "Maximize your growth with our expert advertising.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <RightClickPreventer />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
