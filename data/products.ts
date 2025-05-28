export interface Product {
  id: string;
  name: string;
  description: string;
}

export const products: Product[] = [
  { id: "1", name: "iPhone 15", description: "Latest Apple smartphone." },
  { id: "2", name: "Galaxy S24", description: "Samsung's newest release." },
  { id: "3", name: "Pixel 8", description: "Google's powerful Android phone." },
];
