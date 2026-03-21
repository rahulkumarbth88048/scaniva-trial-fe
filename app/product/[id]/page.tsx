"use client";

import Header from "@/app/components/Header";
import { products } from "@/app/data/products";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const product = products.find((p) => String(p.id) === String(params.id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return <div className="p-10">Product not found</div>;

  const similarProducts = products
    .filter((p) => String(p.id) !== String(product.id))
    .slice(0, 4);

  // OPTIONAL: preselect first color & size so the button state can be known immediately.
  // If you don't want auto-selection, keep them empty and the user must choose.
  useEffect(() => {
    if (!color && product.colors?.length) setColor(product.colors[0].name);
    if (!size && product.sizes?.length) setSize(product.sizes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  // Helper: read cart from localStorage safely
  const getCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  };

  // Helper: write cart to localStorage safely
  const setCart = (items: CartItem[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(items));
  };

  // Is THIS exact variant in cart? (product + color + size)
  const isCurrentVariantInCart = useMemo(() => {
    if (!color || !size) return false;
    const cart = getCart();
    return cart.some(
      (item) =>
        String(item.id) === String(product.id) &&
        item.selectedColor === color &&
        item.selectedSize === size
    );
  }, [product.id, color, size]);

  // Keep button state synced whenever product/color/size changes
  useEffect(() => {
    setAddedToCart(isCurrentVariantInCart);
  }, [isCurrentVariantInCart]);

  // Image slider
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

  // BRING TO ME: add selected variant to cart
  const handleBringToMe = () => {
    if (!color || !size) {
      alert("Please select both color and size first.");
      return;
    }

    const cart = getCart();

    const existingIndex = cart.findIndex(
      (item) =>
        String(item.id) === String(product.id) &&
        item.selectedColor === color &&
        item.selectedSize === size
    );

    if (existingIndex !== -1) {
      // already in cart -> just keep Coming Soon state
      setAddedToCart(true);
      alert("This product variant is already in cart.");
      return;
    }

    const cartItem: CartItem = {
      id: String(product.id),
      name: product.name,
      type: product.type,
      image: product.image[0],
      price: product.price,
      discountPrice: product.discountPrice,
      selectedColor: color,
      selectedSize: size,
      quantity: 1,
    };

    cart.push(cartItem);
    setCart(cart);

    setAddedToCart(true);
    alert("Product added to cart successfully!");
  };

  // CANCEL: remove ONLY the selected variant from cart and reset button
  const handleCancel = () => {
    // If user hasn't selected color/size yet, you can choose behavior:
    // Here we require both to remove the exact variant.
    if (!color || !size) {
      alert("Please select both color and size to cancel this item.");
      return;
    }

    const cart = getCart();

    const updatedCart = cart.filter(
      (item) =>
        !(
          String(item.id) === String(product.id) &&
          item.selectedColor === color &&
          item.selectedSize === size
        )
    );

    // If nothing was removed, tell the user
    if (updatedCart.length === cart.length) {
      alert("This selected product variant is not in the cart.");
      return;
    }

    setCart(updatedCart);
    setAddedToCart(false);
    alert("Product removed from cart.");
  };

  return (
    <>
      <Header />

      <div className="p-10">
        {/* TOP PRODUCT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT IMAGE SECTION */}
          <div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={prevImage}
                className="text-2xl px-3 py-1 border rounded"
                aria-label="Previous image"
              >
                ←
              </button>

              <img
                src={product.image[selectedImage]}
                className="h-[500px] object-contain"
                alt={product.name}
              />

              <button
                onClick={nextImage}
                className="text-2xl px-3 py-1 border rounded"
                aria-label="Next image"
              >
                →
              </button>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-16 object-cover cursor-pointer border ${
                    selectedImage === index ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT PRODUCT DETAILS */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.type}</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="line-through text-gray-400">₹{product.price}</span>
              <span className="text-xl font-bold">₹{product.discountPrice}</span>
              <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {product.off} OFF
              </span>
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
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === c.name ? "border-black" : "border-gray-300"
                    }`}
                    aria-label={c.name}
                    title={c.name}
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
                      size === s ? "bg-red-500 text-white border-red-500" : ""
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleBringToMe}
                className={`px-6 py-3 rounded w-full text-white ${
                  addedToCart ? "bg-blue-500" : "bg-green-500"
                }`}
              >
                {addedToCart ? "Coming Soon" : "Bring to Me"}
              </button>
            </div>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => router.back()}
                className="bg-gray-600 text-white px-6 py-2 rounded w-full"
              >
                Back
              </button>

              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-6 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div className="mt-10 border-t pt-6">
              <h2 className="text-lg font-semibold mb-3">Product Description</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* VIEW SIMILAR SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">View Similar</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {similarProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <div className="cursor-pointer text-center hover:scale-105 transition">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="h-[260px] w-full object-contain"
                  />
                  <p className="mt-3 font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.type}</p>
                  <div className="mt-2">
                    <span className="line-through text-gray-400 mr-2 text-sm">
                      ₹{item.price}
                    </span>
                    <span className="font-bold text-black text-sm">
                      ₹{item.discountPrice}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
    </>
  );
}
