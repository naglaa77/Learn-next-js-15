"use client";

export default function Cart() {
  return (
    <div className="w-[20%] h-screen fixed right-0 top-0 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {/* Cart items will go here */}
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    </div>
  );
}
