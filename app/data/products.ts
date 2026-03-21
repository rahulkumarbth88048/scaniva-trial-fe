export type Product = {
  id: string;
  tagId: string;
  name: string;
  type: string;
  image: string[];
  price: number;
  discountPrice: number;
  off: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    tagId: "H001",
    name: "Iced Light Blue Abstract Print",
    type: "Slim Fit Casual Shirt",
    image: [
        "/product1-1.jpg",
        "/product1-2.jpg",
        "/product1-3.jpg",
        "/product1-4.jpg",
        "/product1-5.jpg",
        "/product1-6.jpg"
    ],
    price: 799,
    discountPrice: 499,
    off: "37%",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Iced Light Blue", hex: "#DDEFF6" }
    ],
    description: "Light Blue, Slim Fit, Full Sleeve, Abstract Print, 100% Cotton, Spread Collar, No Pocket."
  },

  {
    id: "2",
    tagId: "H002",
    name: "Beige Floral Print Stretch",
    type: "Slim Fit Casual Shirt",
    image: [
        "/product2-1.jpg",
        "/product2-2.jpg",
        "/product2-3.jpg",
        "/product2-4.jpg"
    ],
    price: 999,
    discountPrice: 699,
    off: "30%",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Beige", hex: "#F5F5DC" }
    ],
    description: "Beige Relaxed Casual Floral Print Stretch Full Sleeve Casual Shirt In Nylon Elastane, Slim Fit, Full Sleeve, 100% Cotton, Spread Collar, No Pocket."
  },

  {
    id: "3",
    tagId: "H003",
    name: "Jacquard Polo",
    type: "Relaxed Fit Polo T-shirt",
    image: [
        "/product3-1.jpg",
        "/product3-2.jpg",
        "/product3-3.jpg",
        "/product3-4.jpg",
        "/product3-5.jpg",
        "/product3-6.jpg"
    ],
    price: 899,
    discountPrice: 599,
    off: "33%",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Light Pink", hex: "#f58daa" },
      { name: "Light Green", hex: "#D1FFBD" }
    ],
    description: "Clean and contemporary. This light green slim fit polo T-shirt is detailed with a textured jacquard weave in a breathable cotton blend. A versatile piece that transitions effortlessly from daytime plans to evening casual wear, Relaxed Fit, Half Sleeve, 55% Cotton, 45% Polyster, Polo Collar, No Pocket."
  },

  {
    id: "4",
    tagId: "H004",
    name: "Colourblocked Polo",
    type: "Slim Fit Polo T-shirt",
    image: [
        "/product4-1.jpg",
        "/product4-2.jpg",
        "/product4-3.jpg",
        "/product4-4.jpg",
        "/product4-5.jpg",
        "/product4-6.jpg",
        "/product4-7.jpg",
        "/product4-8.jpg"
    ],
    price: 1199,
    discountPrice: 999,
    off: "16%",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Olive", hex: "#303517" },
      { name: "Black", hex: "#000000" }
    ],
    description: "Earthy olive and black tones define this slim fit polo, elevated with contemporary colourblocked detailing for a modern casual look. Crafted from a smooth cotton blend, it offers a smooth hand feel with added structure and durability. Designed for relaxed daily wear with a clean, confident finish, Relaxed Fit, Half Sleeve, 55% Cotton, 45% Polyster, Polo Collar, No Pocket."
  }
];