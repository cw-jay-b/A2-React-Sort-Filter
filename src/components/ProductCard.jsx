import React from 'react';
import '../styles/ProductCard.css';
import NoCarImg from "../assets/default-car.svg"; 

const ProductCard = (product) => {
  const fuelMap = ['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'];
  // console.log(product);
  
  return (
    <div className="product-card">
      {/* {product.profileId} */}
      <img src={product.stockImages[0] || NoCarImg } alt={product.carName} className="product-image" />
      <h2 className="product-title">{product.carName}</h2>
      <p className="product-details">
        <span className='km'>{product.km} km </span> |
        <span className='fuel'>{product.fuel} </span> |
        <span className='cityname'>{product.cityName}</span>
      </p>
      <p className="product-price">Rs. {product.price}</p>
      <button className="product-button">Get Seller Details</button>
    </div>
  );
};

export default ProductCard;
