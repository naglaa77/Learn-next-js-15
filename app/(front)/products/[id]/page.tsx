import Link from "next/link";

const products = [
  { id: "1", name: "iPhone 15", description: "Latest Apple smartphone." },
  { id: "2", name: "Galaxy S24", description: "Samsung's newest release." },
  { id: "3", name: "Pixel 8", description: "Google's powerful Android phone." },
];

export default async function ProductPageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
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
