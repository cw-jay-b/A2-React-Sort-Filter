import React from 'react';
import '../styles/Card.css';

const Card = ({ image, title, fuel, location, price }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-details">{fuel} | {location}</p>
      <p className="card-price">{price}</p>
      <button className="card-button">Buy</button>
    </div>
  );
};

export default Card;
