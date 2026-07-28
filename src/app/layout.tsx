import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ZenModeProvider } from "@/context/ZenModeContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gather — A Space for Collected Thoughts",
  description:
    "A cozy, distraction-free personal blog for essays, notes, and reflections. A space for unhurried thinking.",
  keywords: ["blog", "essays", "writing", "notes", "personal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <AuthProvider>
          <ZenModeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ZenModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
