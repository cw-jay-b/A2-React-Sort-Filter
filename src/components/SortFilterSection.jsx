import React from 'react';
import '../styles/FilterSection.css';

const SortFilterSection = ({
  selectedFuel,
  setSelectedFuel,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder
}) => {
  const handleFuelChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedFuel(prev =>
      prev.includes(value) ? prev.filter(fuel => fuel !== value) : [...prev, value]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newValue = Number(value) * 100000;
    setPriceRange(prev => {
      const newRange = { ...prev, [name]: newValue };
      if (newRange.min > newRange.max) {
        alert('Min price cannot be greater than Max price.');
        return prev;
      }
      return newRange;
    });
  };

  return (
    <aside className="filter-section">
      <h2 style={{marginBottom: "1rem"}} >Filter</h2>
      <div className="filter-group">
        <h4>Fuel</h4>
        {['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'].map((fuel, index) => (
          <label key={index + 1}>
            <input
              style={{margin: "0 0.5rem"}}
              type="checkbox"
              // value={fuel}
              value={index + 1}
              checked={selectedFuel.includes(index + 1)}
              onChange={handleFuelChange}
            />
            {fuel}
          </label>
        ))}
      </div>

      <div className="filter-group" id="min-max-filter">
        <h4>Price Range</h4>
        <div style={{ display: "flex", alignItems: "center" }} >
          <span className="min-max-box" id="min-box">
            <input
            id="min-price-input"
            type="number"
            min={0}
            name="min"
            placeholder="1"
            onBlur={handlePriceChange}
          />Lakhs</span> <span>-</span>
          <span className="min-max-box" id="max-box">
            <input
            min={0}
            id="max-price-input"
            type="number"
            name="max"
            placeholder="5"
            onBlur={handlePriceChange}
          />Lakhs</span>
        </div>
      </div>
    </aside>
  );
};

export default SortFilterSection;