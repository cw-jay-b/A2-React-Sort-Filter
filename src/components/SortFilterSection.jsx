import React, { useRef } from 'react';
import '../styles/FilterSection.css';
import filter_img_path from "../assets/icons8-filter-16.png"

const SortFilterSection = ({
  selectedFuel, setSelectedFuel, 
  setPriceRange, handleClearAll, resultCount}) => {

  const inputRefs = {min: useRef(null), max: useRef(null)}

  const handleClearAllAndMinMaxInputs = () => {
    // check if ref .current key only asign value if ref present
    if (inputRefs.min.current)
      inputRefs.min.current.value = '';
  
    if (inputRefs.max.current)
      inputRefs.max.current.value = '';

    handleClearAll();
  }
  const handleFuelChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedFuel(prev =>
      prev.includes(value) ? prev.filter(fuel => fuel !== value) : [...prev, value]
    );
  }
  const handlePriceChange = (e) => {

    const { name, value } = e.target;
    const newValue = Number(value) * 100000;

    setPriceRange(prev => {
      
      const newRange = { ...prev, [name]: newValue };
      if (newRange.min > newRange.max) {
        alert('Min price cannot be greater than Max price.');
        return prev;
      }
      return newRange ;
    });
  }

  return (
  <aside style={{ position: "sticky", top: "1rem" }} className="filter-section">
    <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }} >
      <span>
        <img src={filter_img_path} alt="filter_icon" style={{ marginRight: "0.5rem" }} />
        <span style={{ fontSize: "1.25rem", fontWeight: "bold" }} >Filters</span>
      </span>
      <button style={{ color: "#0979b6", background: "none", outline: "none", border: "none", cursor: "pointer" }}
        onClick={handleClearAllAndMinMaxInputs}
      >Clear All
      </button>
    </div>
    <div className="filter-group">
      <h4>Fuel</h4>
      {['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'].map((fuel, index) => (
        <label key={index + 1}>
          <input
            style={{ margin: "0 0.5rem" }}
            type="checkbox"
            value={index + 1}
            checked={selectedFuel.includes(index + 1)}
            onChange={handleFuelChange}
          />
          {fuel}
        </label>
      ))}
    </div>

    <div className="filter-group" id="min-max-filter" style={{ marginBottom: "0" }}>
      <h4>Price Range</h4>
      <div style={{ display: "flex", alignItems: "center" }} >
        <span className="min-max-box" id="min-box">
          <input
            ref = {inputRefs.min}
            id="min-price-input"
            type="number"
            min={0}
            name="min"
            placeholder="1"
            onBlur={handlePriceChange}
          />Lakhs</span> <span>-</span>
        <span className="min-max-box" id="max-box">
          <input
            ref = {inputRefs.max}
            min={0}
            id="max-price-input"
            type="number"
            name="max"
            placeholder="5"
            onBlur={handlePriceChange}
          />Lakhs</span>
      </div>
    </div>
  <div className="results-count" >Showing {resultCount} {resultCount>1?"Cars":"Car"} </div>
  </aside>
  );
};

export default SortFilterSection;
