import type { Metadata } from "next";
import { Orbitron, Electrolize } from "next/font/google";
import "./globals.css";
import Nav from "@core/world/components/Nav";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const electrolize = Electrolize({
  weight: "400",
  variable: "--font-electrolize",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omnilith",
  description: "The Omnilith",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${orbitron.variable} ${electrolize.variable}`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
