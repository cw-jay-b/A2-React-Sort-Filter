import React from 'react';
// import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import { describe, test, expect,  } from 'vitest';
import '@testing-library/jest-dom';

import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  const dummyCarDetails = {
    carName: 'Maruti Suzuki Wagon R LXi',
    price: '2.64 Lakh',
    km: '62,000',
    fuel: 'Petrol',
    cityName: 'Mumbai',
    stockImages: []
  };

  test('renders car details correctly', () => {
    const productCard = render(<ProductCard {...dummyCarDetails} />);
    expect(productCard).toMatchSnapshot(); // Snapshot testing
    
    expect(productCard.getByText(dummyCarDetails.carName)).toBeInTheDocument();
    expect(productCard.getByText(dummyCarDetails.price)).toBeInTheDocument();
    expect(productCard.getByText(dummyCarDetails.km)).toBeInTheDocument();
    expect(productCard.getByText(dummyCarDetails.fuel)).toBeInTheDocument();
    expect(productCard.getByText(dummyCarDetails.cityName)).toBeInTheDocument();
  });
});
