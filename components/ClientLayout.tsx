"use client";

import { HydrationFix } from "./HydrationFix";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2>Navbar form layout</h2>
      <HydrationFix />
      {children}
    </>
  );
}
