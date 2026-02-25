"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] pb-14">

      {/* Main Section */}
      <div className="flex flex-1">

        {/* LEFT SIDE — PRODUCTS */}
        <div className="w-1/2 hidden lg:flex items-center justify-center gap-10 px-10">

          {/* Product 1 */}
          <div className="text-center">
            <img
              src="/product1.jpg"
              alt="Product 1"
              className="h-[420px] object-contain"
            />
            <p className="mt-4 font-semibold">Urban Printed Shirt</p>
            <p className="text-sm text-gray-500">Slim Fit</p>
            <div className="mt-2">
              <span className="line-through text-gray-400 mr-2">₹799</span>
              <span className="font-bold text-black">₹499</span>
            </div>
          </div>

          {/* Product 2 */}
          <div className="text-center">
            <img
              src="/product2.jpg"
              alt="Product 2"
              className="h-[420px] object-contain"
            />
            <p className="mt-4 font-semibold">Beige Casual Shirt</p>
            <p className="text-sm text-gray-500">Regular Fit</p>
            <div className="mt-2">
              <span className="line-through text-gray-400 mr-2">₹799</span>
              <span className="font-bold text-black">₹499</span>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE — WELCOME MESSAGE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
          <div className="w-full max-w-md text-center">

            {/* Green Check Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-green-700 flex items-center justify-center">
                <span className="text-4xl text-green-700">✓</span>
              </div>
            </div>

            <h2 className="text-5xl font-bold text-gray-800 mb-2">
              HI !
            </h2>

            <h3 className="text-5xl font-bold text-gray-800 mb-4">
              WELCOME
            </h3>

            <p className="text-2xl font-semibold text-gray-700 mb-4">
              Mr. Anmol Tiwari
            </p>

            <p className="text-gray-600 mb-2">
              To The New Era Of Smart Retail
            </p>

            <p className="text-gray-800 font-semibold mb-8">
              Your account has been login successfully
            </p>

            <Link
              href="/"
              className="inline-block bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition"
            >
              CONTINUE SHOPPING
            </Link>

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