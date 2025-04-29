"use client";

import { HydrationFix } from "./HydrationFix";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HydrationFix />
      {children}
    </>
  );
}
