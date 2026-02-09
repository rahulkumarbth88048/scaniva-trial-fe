import React from "react";
import "./BrandingPage.css";

const BrandingPage = () => {
  return (
    <div className="branding-wrapper">

      {/* Left Image */}
      <div className="image left-image"></div>

      {/* Right Image */}
      <div className="image right-image"></div>

      <div className="center-overlay-image"></div>

      {/* Center Collection Card */}
      <div className="collection-card">
        <p className="new-style" >New Style</p>
        <h1 className="collection">COLLECTION</h1>
        <hr />
        <h2 className="subtitle">Exclusive Fashion Wear</h2>
      </div>

      {/* Bottom Offer Marquee */}
      <div className="offer-marquee" role="status">
        <div className="offer-track">
          <span>
            TODAY OFFER: BUY 2 GET 1 FREE ON SELECTED SHIRTS |
            EXTRA 15% OFF WITH UPI PAYMENT |
            FREE ALTERATION IN 30 MINUTES |
            TOUCH FOR STYLIST ASSISTANCE
          </span>
          <span>
            TODAY OFFER: BUY 2 GET 1 FREE ON SELECTED SHIRTS |
            EXTRA 15% OFF WITH UPI PAYMENT |
            FREE ALTERATION IN 30 MINUTES |
            TOUCH FOR STYLIST ASSISTANCE
          </span>
        </div>
      </div>

    </div>
  );
};

export default BrandingPage;
