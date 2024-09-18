import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortFilterSection from './components/SortFilterSection';
import ProductCard from './components/ProductCard';
import NoDataCard from './components/NoDataCard';
import { fuelTypes } from "./enums/fuelTypes";
import './styles/App.css';

const App = () => {
    const [totalCount, setTotalCount] =useState(0);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedFuel, setSelectedFuel] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });
    const [sortOrder, setSortOrder] = useState('asc');

    // for api call on first render
    useEffect(() => {
        const fetchData = async () => {
           
            try {
                const productsResponse = await axios.get('/api/stocks?budget=0-');
      
                setTotalCount(productsResponse?.data?.totalCount);
                setProducts(productsResponse?.data?.stocks);
                setFilteredProducts(productsResponse?.data?.stocks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const applyFilters = () => {
        let filtered_products = [...products];

        // Create a mapping of selected fuel numbers to fuel names
        const selectedFuelNames = selectedFuel.map(number => fuelTypes[number - 1]);

        if (selectedFuelNames.length > 0) {
            filtered_products = filtered_products.filter(product => selectedFuelNames.includes(product.fuel));
        }

        // Filter by price range
        filtered_products = filtered_products.filter(
            product => parseInt(product.priceNumeric) >= priceRange.min && parseInt(product.priceNumeric) <= priceRange.max
        );

        filtered_products.sort((a, b) => {
            if (sortOrder === 'asc') {
                return (a.priceNumeric - b.priceNumeric); // Ascending price
            } else {
                return (b.priceNumeric - a.priceNumeric); // Descending price
            }
        });
        
        setFilteredProducts(filtered_products);
    };

    const handleClearAll = () => {
        setSelectedFuel([]);
        setPriceRange({ min: 0, max: Number.MAX_SAFE_INTEGER });
    }

    // for redender on state updt
    useEffect(() => {
        applyFilters();
    }, [selectedFuel, priceRange, sortOrder, products]);

    return (
       <>
       <h1 style={{marginBottom: "1rem"}} >{totalCount} Used Cars In India</h1>
       
       <div className="content-wrapper" >
        <section className="left" >
            <SortFilterSection
                selectedFuel={selectedFuel}
                setSelectedFuel={setSelectedFuel}
                setPriceRange={setPriceRange}
                handleClearAll={handleClearAll}
                resultCount = {filteredProducts.length}
            />  
        </section>
        <section className='right' >
            <div className='sort-wrapper'>
            <h5 style={{padding: "0.5rem 0", fontWeight: "normal"}}>Sort By:</h5>
            <select className='sort-input-box' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Price - Ascending</option>
                <option value="desc">Price - Descending</option>
            </select>
            </div>
            <div className="products-wrapper">
            {
                filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.profileId+Math.floor(Math.random()*1000)} {...product} />
                    ))
                ) : (
                    <NoDataCard/>
                )
            }
            </div>
        </section>
       </div>
       </> 
    );
}

export default App;