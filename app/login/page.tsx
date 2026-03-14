"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { products } from "@/app/data/products";

export default function LoginPage() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number
) => {
  const value = e.target.value;

  // Allow only numbers
  if (!/^[0-9]?$/.test(value)) return;

  if (value && index < 5) {
    inputsRef.current[index + 1]?.focus();
  }
};

const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
) => {
  if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
    inputsRef.current[index - 1]?.focus();
  }
};

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
        

        {/* RIGHT SIDE — LOGIN */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
          <div className="w-full max-w-md">

            <h2 className="text-5xl text-center font-bold text-gray-800 mb-2">
              HI !
            </h2>

            <h3 className="text-5xl text-center font-bold text-gray-800 mb-6">
              WELCOME
            </h3>

            {/* Mobile Input */}
            <div className="mb-6">
              <div className="flex items-center border-b-2 border-gray-400 pb-2">
                <span className="mr-2 text-gray-600">+91</span>
                <input
                  type="tel" pattern="[0-9]{10}"
                  minLength={10} maxLength={10}
                  placeholder="Enter mobile Number"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* send otp Button */}
            <button className="w-full bg-blue-400 text-black font-bold py-3 rounded-full text-lg hover:opacity-80 transition">
              SEND OTP
            </button>

            {/* OTP Boxes */}
            <div className="flex justify-between mt-6 mb-6">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 text-center border rounded-md outline-none focus:ring-2 focus:ring-black"
                />
              ))}
            </div>

            {/* Login Button */}
            <button className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full text-lg hover:opacity-90 transition">
              LOGIN
            </button>

            {/* Signup Link */}
            <p className="mt-6 text-sm text-center">
              Don’t have an account?{" "}
              <a href="/signup" className="text-red-500 font-semibold">
                signup
              </a>
            </p>

            <p className="mt-3 text-sm text-center">
              login {" "}
              <a href="/mainpage" className="text-red-500 font-semibold">
                later
              </a>
            </p>

          </div>
        </div>
      </div>

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
  );
}
