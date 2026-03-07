"use client";
import { useRef } from "react";
import Link from "next/link";

export default function SignupPage() {
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
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] pb-14">

      {/* Main Section */}
      <div className="flex flex-1">

        {/* LEFT SIDE — PRODUCTS */}
        <div className="w-1/2 hidden lg:flex items-center justify-center gap-10 px-10">

          {/* Product 1 */}
          <div className="text-center">
            <img
              src="/product1-1.jpg"
              alt="Product 1"
              className="h-[420px] object-contain"
            />
            <p className="mt-4 font-semibold">Iced Light Blue Abstract Print</p>
            <p className="text-sm text-gray-500">Slim Fit Casual Shirt</p>
            <div className="mt-2">
              <span className="line-through text-gray-400 mr-2">₹799</span>
              <span className="font-bold text-black">₹499</span>
            </div>
          </div>

          {/* Product 2 */}
          <div className="text-center">
            <img
              src="/product2-1.jpg"
              alt="Product 2"
              className="h-[420px] object-contain"
            />
            <p className="mt-4 font-semibold">Beige Floral Print Stretch</p>
            <p className="text-sm text-gray-500">Slim Fit Casual Shirt</p>
            <div className="mt-2">
              <span className="line-through text-gray-400 mr-2">₹999</span>
              <span className="font-bold text-black">₹699</span>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE — SIGNUP */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
          <div className="w-full max-w-md">

            <h2 className="text-5xl text-center font-bold text-gray-800 mb-2">
              CREATE
            </h2>

            <h3 className="text-5xl text-center font-bold text-gray-800 mb-6">
              ACCOUNT
            </h3>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full mb-4 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            />

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

            {/* Send OTP Button */}
            <button className="w-full bg-blue-400 text-black font-bold py-3 rounded-full text-lg hover:opacity-80 transition mb-6">
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

            {/* Signup Button */}
            <button className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full text-lg hover:opacity-90 transition">
              SIGN UP
            </button>

            {/* Login Link */}
            <p className="mt-6 text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-red-500 font-semibold">
                Login
              </Link>
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
