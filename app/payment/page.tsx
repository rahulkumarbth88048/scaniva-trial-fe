"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";


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

export default function PaymentPage() {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const total = storedCart.reduce(
      (sum, item) => sum + item.discountPrice * item.quantity,
      0
    );

    setTotalPrice(total);
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-10 border">
          
          {/* Title */}
          <h1 className="text-4xl font-bold text-center mb-4">
            Make Your Payment Here!
          </h1>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            
            {/* LEFT SIDE */}
            <div className="flex flex-col items-start">
              
              {/* QR IMAGE */}
              <img
                src="/qr.png"
                alt="QR Code"
                className="w-64 h-64 object-contain mb-5"
              />

              {/* Date */}
              <div>
                <p className="text-2xl font-medium">Date</p>
                <p className="text-3xl font-semibold uppercase mt-2">
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              
              {/* Order Note */}
              <p className="text-2xl text-gray-700 mb-5 max-w-md">
                Kindly check order details before checkout
              </p>

              {/* Cart Icon */}
              <div className="text-8xl mb-4">🛒</div>

              {/* Total */}
              <p className="text-5xl font-medium mb-3">TOTAL</p>
              <p className="text-6xl font-bold">₹ {totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Thank You */}
          <div className="mt-5 text-center">
            <h2 className="text-4xl font-bold">Thank You</h2>
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
    </>
  );
}