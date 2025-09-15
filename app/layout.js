import { Inter } from "next/font/google";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";
import { Providers } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Fluxon - SaaS Hosting Platform",
  description: "A clean minimal SaaS hosting dashboard",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
