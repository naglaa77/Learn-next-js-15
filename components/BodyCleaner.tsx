"use client";

import { useCleanUnexpectedBodyAttributes } from "@/utils/detectUnexpectedBodyAttributes";

export function BodyCleaner() {
  useCleanUnexpectedBodyAttributes();
  return null;
}
