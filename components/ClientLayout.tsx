"use client";

import { HydrationFix } from "./HydrationFix";
import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <HydrationFix />
      <div className="flex">
        <main className="w-[80%] mx-auto min-h-screen">{children}</main>
      </div>
    </>
  );
}
