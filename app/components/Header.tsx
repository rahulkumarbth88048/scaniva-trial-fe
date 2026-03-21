"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="flex items-center justify-between px-10 py-4 border-b relative">
      
      {/* Logo */}
      <Link href="/mainpage" className="text-2xl font-bold cursor-pointer">
        Scaniva Smart Trial Room
      </Link>

      {/* Icons */}
      <div className="flex gap-6 text-xl items-center relative">
        
        {/* User Icon */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer"
          >
            👤
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg z-50">
              <Link
                href="/account"
                className="block px-4 py-3 hover:bg-gray-100 text-sm"
                onClick={() => setShowDropdown(false)}
              >
                My Account
              </Link>

              <Link
                href="/orders"
                className="block px-4 py-3 hover:bg-gray-100 text-sm"
                onClick={() => setShowDropdown(false)}
              >
                My Order
              </Link>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  alert("Logged out");
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link href="/cart" className="cursor-pointer">
          🛒
        </Link>
      </div>
    </header>
  );
}
