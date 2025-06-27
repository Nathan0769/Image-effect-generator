import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Image effect generator",
  description: "Image effect generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        data-theme="cupcake"
      >
        {children}
      </body>
    </html>
  );
}
