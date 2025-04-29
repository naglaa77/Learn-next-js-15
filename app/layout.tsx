// import { BodyCleaner } from "@/components/BodyCleaner";
import { BodyCleaner } from "@/components/BodyCleaner";
import ClientLayout from "@/components/ClientLayout";
// import ClientLayout from "@/components/ClientLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Next.js 15",
  description: "A comprehensive guide to learning Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <BodyCleaner />
        <p>navbar from layout</p>

        {children} */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
