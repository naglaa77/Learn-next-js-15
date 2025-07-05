import Link from "next/link";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   console.log("Generating static pages for products...");
//   return products.map((product) => ({
//     id: product.id,
//   }));
// }

export default async function ProductPageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Link href="/products" className="underline text-blue-600">
        Products Page
      </Link>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
