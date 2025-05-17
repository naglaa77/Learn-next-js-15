"use client";

import { HydrationFix } from "./HydrationFix";
import Navbar from "@/components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <HydrationFix />
      {children}
    </>
  );
}
