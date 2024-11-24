import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SessionComponent from "@/components/SessionComponent";

import AmplifyInitializer from "@/components/AmplifyInitializer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Resident Equal",
  description: "COUNTRY BEARS' UNITED CHRISTIAN CHURCH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AmplifyInitializer>
          <SessionComponent>{children} </SessionComponent>
        </AmplifyInitializer>
      </body>
    </html>
  );
}
