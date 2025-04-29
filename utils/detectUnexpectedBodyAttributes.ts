"use client";

import { useEffect } from "react";

export const useCleanUnexpectedBodyAttributes = () => {
  useEffect(() => {
    // Get the body element
    const body = document.body;

    // List of attributes to remove
    const attributesToRemove = ["cz-shortcut-listen"];

    // Remove each attribute if it exists
    attributesToRemove.forEach((attr) => {
      if (body.hasAttribute(attr)) {
        body.removeAttribute(attr);
      }
    });
  }, []); // Empty dependency array means this runs once on mount
};
