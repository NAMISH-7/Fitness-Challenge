import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@tn/shared/globals.css";
import { ThemeProvider } from "@tn/shared/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TNFitness — Tamil Nadu's Biggest Fitness Challenge",
  description:
    "Join thousands of participants across Tamil Nadu in monthly walking and running challenges. Track your progress, compete on leaderboards, and earn achievements.",
  keywords: ["fitness", "challenge", "Tamil Nadu", "running", "walking", "leaderboard", "health"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
