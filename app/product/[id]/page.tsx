"use client";

import Header from "@/app/components/Header";
import { products } from "@/app/data/products";
import { useParams } from "next/navigation";
import { useState } from "react";


export default function ProductPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);

  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return <div>Product not found</div>;

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  // Slider functions
  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === product.image.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? product.image.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Header />

      <div className="grid grid-cols-2 gap-10 p-10">

        {/* LEFT IMAGE SECTION */}

        <div>

          {/* Main Image with arrows */}
          <div className="flex items-center justify-center gap-4 mb-6">

            <button
              onClick={prevImage}
              className="text-2xl px-3 py-1 border rounded"
            >
              ←
            </button>

            <img
              src={product.image[selectedImage]}
              className="h-[500px] object-contain"
            />

            <button
              onClick={nextImage}
              className="text-2xl px-3 py-1 border rounded"
            >
              →
            </button>

          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center">

            {product.image.map((img, index) => (

              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-16 object-cover cursor-pointer border
                ${selectedImage === index ? "border-black" : "border-gray-300"}`}
              />

            ))}

          </div>

        </div>

        {/* RIGHT PRODUCT DETAILS */}

        <div>

          <h1 className="text-2xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {product.type}
          </p>

          <div className="mt-3">
            <span className="line-through text-gray-400 mr-2">
              ₹{product.price}
            </span>

            <span className="text-xl font-bold mr-2">
              ₹{product.discountPrice}
            </span>

            <samp className="bg-red-500 text-white text-l font-semibold px-3 py-1 rounded-full">
                {product.off} off
            </samp>
          </div>

          {/* COLORS */}
        <div className="mt-6">
            <p className="font-semibold mb-2">COLOR</p>

            <div className="flex gap-3">
                {product.colors.map((c) => (
                <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    style={{ background: c.hex }}
                    className={`w-8 h-8 rounded-full border ${
                    color === c.name ? "border-black" : "border-gray-300"
                }`}
            />
            ))}
            </div>
        </div>

          {/* SIZE */}
          <div className="mt-6">
            <p className="font-semibold mb-2">SIZE</p>

            <div className="flex gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded ${
                    size === s ? "bg-red-500 text-white" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-8 flex gap-4">

            <button className="bg-green-500 text-white px-6 py-3 rounded w-full">
              Bring to Me
            </button>

          </div>

          <div className="mt-4 flex gap-4">

            <button className="bg-gray-600 text-white px-6 py-2 rounded w-full">
              Back
            </button>

            <button className="bg-red-500 text-white px-6 py-2 rounded w-full">
              Cancel
            </button>

          </div>
        {/* PRODUCT DESCRIPTION */}
            <div className="mt-10 border-t pt-6">
            <h2 className="text-lg font-semibold mb-3">
                Product Description
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm">
                {product.description}
            </p>
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