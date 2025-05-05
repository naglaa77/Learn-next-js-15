"use client";
import { useState } from "react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  console.log("Products Page");

  return (
    <div>
      <h1>Products Page</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <p>Hello {search}</p>
    </div>
  );
}
