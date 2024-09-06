import React from 'react';
import '../styles/ProductCard.css';
import NoCarImg from "/default-img.png"; 

const ProductCard = (product) => {
  const fuelMap = ['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'];
  // console.log(product);
  
  return (
    <div className="product-card">
      {/* {product.profileId} */}
      <img src={product.stockImages[0] || NoCarImg } alt={product.carName} className="product-image" />
      <h2 className="product-title">{product.carName}</h2>
      <p className="product-details">{product.fuel} | {product.cityName}</p>
      <p className="product-price">{product.price}</p>
      <button className="product-button">Get Seller Details</button>
    </div>
  );
};

export default ProductCard;
