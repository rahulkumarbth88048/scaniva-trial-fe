"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  tagId: string;
  name: string;
  type: string;
  price: number;
  discountPrice: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
};

type CartItem = {
  product: Product;
  size: string;
  color: string;
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    tagId: "RFID-1001",
    name: "Urban Flex Shirt",
    type: "Slim Fit",
    price: 2499,
    discountPrice: 1799,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#22335c" },
      { name: "Mint", hex: "#9fe3cb" },
      { name: "Sand", hex: "#d2bd9b" },
    ],
    description:
      "Breathable premium cotton shirt with stretch blend for all-day comfort.",
  },
  {
    id: "p2",
    tagId: "RFID-1002",
    name: "Metro Chino",
    type: "Tapered",
    price: 3199,
    discountPrice: 2399,
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Olive", hex: "#78835f" },
      { name: "Charcoal", hex: "#43464c" },
      { name: "Khaki", hex: "#c7ab7e" },
    ],
    description:
      "Smart-casual stretch chinos with clean taper and wrinkle-resistant finish.",
  },
  {
    id: "p3",
    tagId: "RFID-1003",
    name: "Evening Blazer",
    type: "Regular Fit",
    price: 6799,
    discountPrice: 4999,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Wine", hex: "#5e1f38" },
      { name: "Steel", hex: "#60717d" },
    ],
    description:
      "Structured single-breasted blazer designed for events and formal evenings.",
  },
];

type Screen = "idle" | "catalog" | "detail" | "cart" | "payment";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const createQrMask = () => {
  const size = 21;
  const key = "SCANIVA-TRIAL-SECURE-PAY";
  const filled: boolean[] = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const inFinder =
        (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      const inFinderBorder =
        (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);

      if (inFinderBorder) {
        const innerX = x > 13 ? x - 14 : x;
        const innerY = y > 13 ? y - 14 : y;
        const border =
          innerX === 0 ||
          innerY === 0 ||
          innerX === 6 ||
          innerY === 6 ||
          (innerX > 1 && innerX < 5 && innerY > 1 && innerY < 5);

        filled.push(border);
      } else if (inFinder) {
        filled.push(false);
      } else {
        const index = y * size + x;
        const charCode = key.charCodeAt(index % key.length);
        filled.push(((x * 3 + y * 5 + charCode) & 1) === 0);
      }
    }
  }

  return filled;
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("idle");
  const [detected, setDetected] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState("");
  const [itemToAdd, setItemToAdd] = useState<CartItem | null>(null);

  const activeProduct = detected[activeIndex] ?? null;
  const qrMask = useMemo(() => createQrMask(), []);

  const scanTag = (product: Product) => {
    setDetected((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, product];
    });
    setActiveIndex(0);
    setScreen("catalog");
  };

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0].name);
    setScreen("detail");
  };

  const startAddToCart = (product: Product, size: string, color: string) => {
    setItemToAdd({ product, size, color });
    setShowOtpForm(true);
    setFormError("");
  };

  const confirmAddToCart = () => {
    if (!itemToAdd) return;

    if (!customerName.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!customerEmail.includes("@")) {
      setFormError("Please enter a valid email.");
      return;
    }
    if (otp.trim().length !== 6) {
      setFormError("OTP should be 6 digits.");
      return;
    }

    setCartItems((prev) => [...prev, itemToAdd]);
    setShowOtpForm(false);
    setItemToAdd(null);
    setOtp("");
    setFormError("");
    setScreen("cart");
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.discountPrice, 0);

  return (
    <div className="trialroom-app">
      <div className="ambient-shape ambient-left" />
      <div className="ambient-shape ambient-right" />

      <main className="screen-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">Smart Trial Room</p>
            <h1>Scaniva Mirror</h1>
          </div>
          <button className="ghost-btn" onClick={() => setScreen("idle")}>
            Reset
          </button>
        </header>

        {screen === "idle" && (
          <section className="panel center-panel">
            <p className="status-chip">RFID Ready</p>
            <h2>Bring cloth near scanner to auto-load products</h2>
            <p>
              Each garment has an RFID tag. Tap any tag below to simulate auto-detection.
            </p>
            <div className="tag-grid">
              {PRODUCTS.map((item) => (
                <button
                  key={item.id}
                  className="tag-btn"
                  onClick={() => scanTag(item)}
                >
                  <span>{item.tagId}</span>
                  <strong>{item.name}</strong>
                </button>
              ))}
            </div>
          </section>
        )}

        {screen === "catalog" && (
          <section className="panel">
            <div className="section-head">
              <h2>Detected clothes ({detected.length})</h2>
              <div className="inline-actions">
                {PRODUCTS.map((item) => (
                  <button
                    key={item.id}
                    className="mini-btn"
                    onClick={() => scanTag(item)}
                  >
                    + {item.tagId}
                  </button>
                ))}
              </div>
            </div>

            {activeProduct ? (
              <>
                <div className="swiper-wrap">
                  <button
                    className="nav-btn"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === 0 ? detected.length - 1 : prev - 1,
                      )
                    }
                  >
                    ◀
                  </button>

                  <article
                    className="product-card"
                    onClick={() => openDetail(activeProduct)}
                  >
                    <p className="type-pill">{activeProduct.type}</p>
                    <h3>{activeProduct.name}</h3>
                    <p>{activeProduct.description}</p>
                    <div className="price-row">
                      <span className="price-now">
                        {formatPrice(activeProduct.discountPrice)}
                      </span>
                      <span className="price-old">
                        {formatPrice(activeProduct.price)}
                      </span>
                    </div>
                    <p className="meta-row">
                      Sizes: {activeProduct.sizes.join(" / ")}
                    </p>
                    <div className="color-row">
                      {activeProduct.colors.map((color) => (
                        <span
                          key={color.name}
                          title={color.name}
                          className="color-dot"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                    <button
                      className="solid-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        startAddToCart(
                          activeProduct,
                          activeProduct.sizes[0],
                          activeProduct.colors[0].name,
                        );
                      }}
                    >
                      Add To Cart
                    </button>
                  </article>

                  <button
                    className="nav-btn"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === detected.length - 1 ? 0 : prev + 1,
                      )
                    }
                  >
                    ▶
                  </button>
                </div>

                <div className="dots">
                  {detected.map((item, index) => (
                    <button
                      key={item.id}
                      className={index === activeIndex ? "dot active" : "dot"}
                      onClick={() => setActiveIndex(index)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>No product detected.</p>
            )}
          </section>
        )}

        {screen === "detail" && selectedProduct && (
          <section className="panel detail-layout">
            <article className="product-card detail-main">
              <p className="type-pill">{selectedProduct.type}</p>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>

              <div>
                <h4>Choose size</h4>
                <div className="choice-row">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={selectedSize === size ? "choice active" : "choice"}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4>Choose color</h4>
                <div className="choice-row">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      className={
                        selectedColor === color.name ? "choice active" : "choice"
                      }
                      onClick={() => setSelectedColor(color.name)}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="price-row">
                <span className="price-now">
                  {formatPrice(selectedProduct.discountPrice)}
                </span>
                <span className="price-old">{formatPrice(selectedProduct.price)}</span>
              </div>

              <div className="inline-actions">
                <button className="ghost-btn" onClick={() => setScreen("catalog")}>
                  Back To Swipe
                </button>
                <button
                  className="solid-btn"
                  onClick={() =>
                    startAddToCart(selectedProduct, selectedSize, selectedColor)
                  }
                >
                  Add To Cart
                </button>
              </div>
            </article>

            <aside className="bring-panel">
              <h3>Bring To Me</h3>
              <p>
                Need a different size or color? Request floor staff to bring it to your room.
              </p>
              <p>
                Selected: <strong>{selectedSize}</strong> /{" "}
                <strong>{selectedColor}</strong>
              </p>
              <button className="solid-btn">Notify Staff</button>
            </aside>
          </section>
        )}

        {screen === "cart" && (
          <section className="panel">
            <div className="section-head">
              <h2>Cart Details</h2>
              <button className="ghost-btn" onClick={() => setScreen("catalog")}>
                Continue Browsing
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="cart-list">
                {cartItems.map((item, index) => (
                  <article key={`${item.product.id}-${index}`} className="cart-item">
                    <div>
                      <h4>{item.product.name}</h4>
                      <p>
                        Size: {item.size} | Color: {item.color} | {item.product.type}
                      </p>
                    </div>
                    <strong>{formatPrice(item.product.discountPrice)}</strong>
                  </article>
                ))}
              </div>
            )}

            <div className="checkout-row">
              <p>
                Total <strong>{formatPrice(total)}</strong>
              </p>
              <button
                className="solid-btn"
                onClick={() => setScreen("payment")}
                disabled={!cartItems.length}
              >
                Checkout
              </button>
            </div>
          </section>
        )}

        {screen === "payment" && (
          <section className="panel payment-panel">
            <h2>QR Payment</h2>
            <p>Scan with any UPI app to complete your checkout.</p>
            <div className="qr-box" aria-label="Payment QR code">
              {qrMask.map((isFilled, index) => (
                <span
                  key={index}
                  className={isFilled ? "qr-cell filled" : "qr-cell"}
                />
              ))}
            </div>
            <p className="meta-row">Order Amount: {formatPrice(total)}</p>
            <div className="inline-actions">
              <button className="ghost-btn" onClick={() => setScreen("cart")}>
                Back To Cart
              </button>
              <button className="solid-btn" onClick={() => setScreen("idle")}>
                Finish Session
              </button>
            </div>
          </section>
        )}
      </main>

      <div className="offer-marquee" role="status">
        <div className="offer-track">
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

      {showOtpForm && (
        <div className="overlay">
          <div className="otp-modal">
            <h3>Complete Add To Cart</h3>
            <p>Enter details and OTP verification.</p>
            <label>
              Name
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter full name"
              />
            </label>
            <label>
              Email
              <input
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                placeholder="Enter email"
                type="email"
              />
            </label>
            <label>
              OTP
              <input
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder="6-digit OTP"
                maxLength={6}
              />
            </label>
            {formError && <p className="error-text">{formError}</p>}
            <div className="inline-actions">
              <button className="ghost-btn" onClick={() => setShowOtpForm(false)}>
                Cancel
              </button>
              <button className="solid-btn" onClick={confirmAddToCart}>
                Verify & Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
