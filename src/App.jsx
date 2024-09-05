import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterSection from './components/FilterSection';
import ProductCard from './components/ProductCard';
import './styles/App.css';
const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState([]);
  // const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          // https://stg.carwale.com/api/stocks?fuel=1+2
          // axios.get('https://dummyjson.com/products'),
          axios.get('https://dummyjson.com/c/2ddb-0dd0-4899-aef2'),
          // axios.get('https://stg.carwale.com/api/stocks?fuel=1+2'),
          axios.get('https://dummyjson.com/products/categories')
        ]);
        setProducts(productsResponse.data.stocks);
        setFilteredProducts(productsResponse.data.stocks);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const applyFilters = () => {
    
    let filtered = [...products];

    if (selectedFuel.length > 0) {
      console.log("applied filters 0");
      filtered = filtered.filter(product =>
        selectedFuel.includes(product.fuel)
      );
    }

    filtered = filtered.filter(
      product => {
        console.log(priceRange.min, parseInt(product.priceNumeric), priceRange.max);
        
        console.log("applied filters 1");
        return parseInt(product.priceNumeric) >= priceRange.min && parseInt(product.priceNumeric) <= priceRange.max
      }
    );

    filtered.sort((a, b) => {
      console.log("applied filters 2");
      return sortOrder === 'asc'
        ? a.rating - b.rating
        : b.rating - a.rating;
    });
    console.log(filtered);
    
    setFilteredProducts([...filtered]);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFuel, priceRange, sortOrder, products]);

  return (
    <main>
      <h1>
        {filteredProducts.length} used cars in India
      </h1>
    <div className="app-container">
      <FilterSection
        categories={categories}
        selectedFuel={selectedFuel}
        setSelectedFuel={setSelectedFuel}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <div className="products-list">
        {filteredProducts.map(product => (
            <ProductCard key={product.profileId} {...product} />
        ))}
      </div>
      
    </div>
    </main>
  );
};

export default App;