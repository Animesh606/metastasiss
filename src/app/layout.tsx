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
import { LoggedinUser } from "@/components/loginuser";
export const metadata: Metadata = {
  title: "Meta-stasiss",
  description: "AIIMS GUWAHATI",
};
const user={
  email:"dkv",
  name:"vkdvi",
  role:"jbhue",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedin=true;
  return (
    <html lang="en">
       <AOSInit />
      <body className={inter.className}>
        <Navbar/>
       {loggedin&& <LoggedinUser user={user}/>}
        <Toaster position="bottom-center" />
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}
