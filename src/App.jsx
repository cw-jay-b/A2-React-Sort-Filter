import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortFilterSection from './components/SortFilterSection';
import ProductCard from './components/ProductCard';
import NoDataCard from './components/NoDataCard';
import './styles/App.css';


import { stocks } from "./dummy/data/cars.json";

const App = () => {
    const [totalCount, setTotalCount] =useState(0);
    const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'];
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedFuel, setSelectedFuel] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });
    const [sortOrder, setSortOrder] = useState('asc');
    useEffect(() => {
        const fetchData = async () => {
            // *************************** DUMMY DATA TO BE REMOVED LATER ***************************

            // setProducts(stocks)

            // **************************************************************************************

            // console.log(productsResponse.data.stocks);


            // console.log(productsResponse);
            // console.log(productsResponse.data);
            // console.log(productsResponse.data.stocks);
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    // https://stg.carwale.com/api/stocks?fuel=1+2
                    // axios.get('https://dummyjson.com/products'),
                    // axios.get('https://dummyjson.com/c/2ddb-0dd0-4899-aef2'),
                    // axios.get('https://stg.carwale.com/api/stocks?fuel=1+2+3+4+5+6&budget=0-'),
                    axios.get('/api/stocks'),
                    axios.get('https://dummyjson.com/products/categories')
                ]);
                setTotalCount(productsResponse.data.totalCount);
                setProducts(productsResponse.data.stocks);
                setFilteredProducts(productsResponse.data.stocks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const applyFilters = () => {
        let filtered = [...products];

        // Create a mapping of selected fuel numbers to fuel names
        const selectedFuelNames = selectedFuel.map(number => fuelTypes[number - 1]);

        if (selectedFuelNames.length > 0) {
            filtered = filtered.filter(product => selectedFuelNames.includes(product.fuel));
        }

        // Filter by price range
        filtered = filtered.filter(
            product => parseInt(product.priceNumeric) >= priceRange.min && parseInt(product.priceNumeric) <= priceRange.max
        );

        filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return (a.priceNumeric - b.priceNumeric); // Ascending price
            } else {
                return (b.priceNumeric - a.priceNumeric); // Descending price
            }
        });
    
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [selectedFuel, priceRange, sortOrder, products]);

    return (
       <>
       <h1>{totalCount} Used Cars In India</h1>
       
       <div className="content-wrapper" >
        <section className="left" >
            <SortFilterSection
                selectedFuel={selectedFuel}
                setSelectedFuel={setSelectedFuel}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            <div className="results-count" >Showing {filteredProducts.length} {filteredProducts.length>1?"Cars":"Car"} </div>  
        </section>
        <section className='right' >
            <div className='sort-wrapper'>
            <h5 style={{padding: "0.5rem 0", fontWeight: "normal"}}>Sort by Price</h5>
            <select className='sort-input-box' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            </div>
            <div className="products-wrapper">
            {
                filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.profileId} {...product} />
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