"use client";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      
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
                  maxLength={1}
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

            <p className="mt-3 text-xs text-gray-500 text-center">
              Wants to change language?{" "}
              <span className="text-red-500 cursor-pointer">English</span>
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