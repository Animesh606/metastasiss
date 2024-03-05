import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Toaster } from "react-hot-toast";
config.autoAddCss = false
const inter = Inter({ subsets: ["latin"] });
import { AOSInit } from './aos'

export const metadata: Metadata = {
  title: "Meta-stasiss",
  description: "AIIMS GUWAHATI",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <AOSInit />
      <body className={inter.className}>
        <Navbar/>
        <Toaster position="bottom-center" />
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}
