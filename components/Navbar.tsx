"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "About", url: "/about" },
  { name: "Products", url: "/products" },
];

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>
        <div className="space-x-4">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={
                pathName === link.url || pathName.startsWith(link.url)
                  ? "text-blue-900 font-bold"
                  : "text-blue-600 hover:text-blue-800"
              }
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
