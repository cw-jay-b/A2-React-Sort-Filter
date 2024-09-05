import React from 'react';
import '../styles/FilterSection.css';

const FilterSection = ({
  categories,
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
      prev.includes(value)
        ? prev.filter(fuel => fuel !== value)
        : [...prev, value]
    );
  };

  const handlePriceChange = (e) => {
  
    
    const { name, value } = e.target;
    const newValue = Number(value);


    setPriceRange(prevState => {
      console.log("price chng",prevState);
      
      const newPriceRange = { ...prevState, [name]: newValue * 100000 };

      if (newPriceRange.min > newPriceRange.max) {
        alert('Min price cannot be greater than Max price.');
        return prevState; // Return previous state if invalid
      }

      if (newPriceRange.max < newPriceRange.min) {
        alert('Max price cannot be less than Min price.');
        return prevState; // Return previous state if invalid
      }

      console.log("price chng",name, value);
      console.log("price chng",newPriceRange);

      setPriceRange(newPriceRange);



      return newPriceRange;
    });
  }



  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="filter-section">
      <h3>Filters</h3>
      <div className="filter-group">
        <h4>Fuel</h4>
        {['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'].map((fuel, index) => (
          <label key={fuel}>
            <input
              type="checkbox"
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
            name="min"
            placeholder="1"
            onBlur={handlePriceChange}
          />Lakhs</span> <span>-</span>
          <span className="min-max-box" id="max-box">
            <input
            id="max-price-input"
            type="number"
            name="max"
            placeholder="5"
            onBlur={handlePriceChange}
          />Lakhs</span>
        </div>
      </div>

      <div className="filter-group">
        <h3>Sort by Rating</h3>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
