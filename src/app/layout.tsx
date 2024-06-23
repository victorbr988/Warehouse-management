import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextThemeProvider } from "@/providers/ThemeProvider";
import { ReactQueryClientProvider } from "@/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SemeaTech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <NextThemeProvider>
            {children}
            <Toaster />
          </NextThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
