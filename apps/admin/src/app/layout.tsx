import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@tn/shared/globals.css";
import { ThemeProvider } from "@tn/shared/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TNFitness Admin",
  description: "Admin dashboard for TNFitness platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
