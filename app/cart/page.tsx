"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { products } from "@/app/data/products";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  discountPrice: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const removeItem = (indexToRemove: number) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.discountPrice * item.quantity,
    0
  );

const [startIndex, setStartIndex] = useState(0);

const itemsPerSlide = 2;

const visibleProducts = products.slice(startIndex, startIndex + itemsPerSlide);

const nextProducts = () => {
  if (startIndex + itemsPerSlide < products.length) {
    setStartIndex(startIndex + itemsPerSlide);
  } else {
    setStartIndex(0);
  }
};

const prevProducts = () => {
  if (startIndex - itemsPerSlide >= 0) {
    setStartIndex(startIndex - itemsPerSlide);
  } else {
    const lastStart = Math.max(products.length - itemsPerSlide, 0);
    setStartIndex(lastStart);
  }
};

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      
      {/* Main Section */}
      <div className="flex flex-1">
        {/* LEFT SIDE — PRODUCTS SLIDER */}
        <div className="w-1/2 hidden lg:flex items-center justify-center px-10 relative">
          
          {/* LEFT ARROW */}
          <button
            onClick={prevProducts}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition flex items-center justify-center text-xl"
          >
            ←
          </button>

          {/* 1 ROW + 2 COLUMNS */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {visibleProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="text-center cursor-pointer hover:scale-105 transition">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="h-[320px] w-full object-contain"
                  />

                  <p className="mt-3 font-semibold text-sm">
                    {product.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {product.type}
                  </p>

                  <div className="mt-1">
                    <span className="line-through text-gray-400 mr-2 text-sm">
                      ₹{product.price}
                    </span>

                    <span className="font-bold text-black text-sm">
                      ₹{product.discountPrice}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* RIGHT ARROW */}
          <button
            onClick={nextProducts}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition flex items-center justify-center text-xl"
          >
            →
          </button>
        </div>
      <div className="w-full lg:w-1/2 p-10 flex flex-col h-[calc(100vh-100px)]">
        <h1 className="text-3xl font-bold mb-4">My Cart</h1>

        {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
            ) : (
            <>
                <div
                className={`space-y-6 ${
                    cartItems.length > 2 ? "max-h-[500px] overflow-y-auto pr-2" : ""
                }`}
                >
                {cartItems.map((item, index) => (
                    <div
                    key={index}
                    className="flex items-center gap-6 border rounded-lg p-4 shadow-sm bg-white"
                    >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-24 object-contain"
                    />

                    <div className="flex-1">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-500">{item.type}</p>

                        <p className="mt-2 text-sm">
                        <span className="font-medium">Color:</span> {item.selectedColor}
                        </p>

                        <p className="text-sm">
                        <span className="font-medium">Size:</span> {item.selectedSize}
                        </p>

                        <p className="text-sm">
                        <span className="font-medium">Quantity:</span> {item.quantity}
                        </p>

                        <p className="mt-2 text-lg font-bold text-green-600">
                        ₹{item.discountPrice}
                        </p>
                    </div>

                    <button
                        onClick={() => removeItem(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Remove
                    </button>
                    </div>
                ))}
                </div>

                <div className="mt-auto border-t pt-6 flex justify-between items-center bg-[#f5f5f5]">
                <h2 className="text-2xl font-bold">Total: ₹{totalPrice}</h2>

                <Link href="/payment">
                    <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold">
                        Check Out
                    </button>
                    </Link>
                </div>
            </>
            )}
        {/* Bottom Offer Strip */}
      <div role="status" className="offer-marquee">
        <div className="marquee-animation">
          <span>
            TODAY OFFER: BUY 2 GET 1 FREE ON SELECTED SHIRTS | EXTRA 15% OFF WITH UPI
            PAYMENT | FREE ALTERATION IN 30 MINUTES | TOUCH FOR STYLIST ASSISTANCE
          </span>
          <span>
            TODAY OFFER: BUY 2 GET 1 FREE ON SELECTED SHIRTS | EXTRA 15% OFF WITH UPI
            PAYMENT | FREE ALTERATION IN 30 MINUTES | TOUCH FOR STYLIST ASSISTANCE
          </span>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}