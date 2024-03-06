import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
import SessionProvider from "./Provider";
import { getServerSession } from "next-auth";
config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });
import { AOSInit } from "./aos";

export const metadata: Metadata = {
    title: "Meta-stasiss",
    description: "AIIMS GUWAHATI",
};
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    return (
        <html lang="en">
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            <SessionProvider session={session}>
                <AOSInit />
                <body className={inter.className}>
                    <Navbar />
                    <Toaster position="bottom-center" />
                    {children}
                    <SpeedInsights />
                </body>
            </SessionProvider>
        </html>
    );
}
