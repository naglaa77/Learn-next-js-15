"use client";
import { useState } from "react";
//import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <div className="p-4">
      {/* <Link href="/" className="text-blue-600 underline">
        Return to Home Page
      </Link> */}
      <button
        type="button"
        className="underline cursor-pointer"
        onClick={() => {
          console.log("form useRouter");
          router.push("/");
        }}
      >
        Home Page
      </button>
      <h1 className="text-2xl text-green-700 mt-4">Products Page</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <p>Hello {search}</p>
    </div>
  );
}
