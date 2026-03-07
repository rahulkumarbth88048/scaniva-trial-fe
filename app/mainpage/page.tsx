import Header from "@/app/components/Header";
import Link from "next/link";
import { products } from "@/app/data/products";

export default function MainPage() {
  return (
    <>
      <Header />

      <main className="px-10 py-10">

        <div className="grid grid-cols-3 gap-10">

          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>

              <div className="text-center cursor-pointer hover:scale-105 transition">

                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="h-[420px] w-full object-contain"
                />

                <p className="mt-4 font-semibold">
                  {product.name}
                </p>

                <p className="text-sm text-gray-500">
                  {product.type}
                </p>

                <div className="mt-2">
                  <span className="line-through text-gray-400 mr-2">
                    ₹{product.price}
                  </span>

                  <span className="font-bold text-black">
                    ₹{product.discountPrice}
                  </span>
                </div>

              </div>

            </Link>
          ))}

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
      </main>
    </>
  );
}