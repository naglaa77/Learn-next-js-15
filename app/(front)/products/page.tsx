import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <div className="p-4">
      <Link href="/" className="underline text-blue-600">
        Home Page
      </Link>

      <h1 className="text-2xl text-green-700 mt-4">Products Page</h1>

      <ul className="mt-6 space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 hover:bg-gray-100">
            <Link href={`/products/${product.id}`}>
              <h2 className="text-xl font-semibold">{product.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
