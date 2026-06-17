import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const alpharush = localFont({
  src: "./fonts/Alpharush.ttf",
  variable: "--font-alpharush",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yasser Nasr — Senior Graphic Designer, Brand & Digital Designer",
  description:
    "I turn ideas into visual systems, digital experiences, and communication that people can understand, feel, and remember.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${alpharush.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <div aria-hidden="true" className="background-field" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
