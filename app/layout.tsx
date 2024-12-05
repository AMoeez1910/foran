import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";


const HandyCasualRegular = localFont({
  src: "./fonts/HandyCasualCondensed-Regular.ttf",
  variable: "--font-handy-casual-regular",
  weight:"100 900",
});
const HandyCasualOblique = localFont({
  src: "./fonts/HandyCasualCondensed-Oblique.ttf",
  variable: "--font-handy-casual-oblique",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Forun",
  description:
    "Forun is a delivery service which aims to revolutionise last mile delivery experience",
  openGraph: {
    title: "Forun",
    description:
      "Forun is a delivery service which aims to revolutionise last mile delivery experience",
    images: [{ url: `/images/logo.png` }],
    type: "website",
  },
  icons: {
    icon: [
      { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${HandyCasualRegular.variable} ${HandyCasualOblique.variable} antialiased`}
      >
        <Toaster position="bottom-right" reverseOrder={false} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
