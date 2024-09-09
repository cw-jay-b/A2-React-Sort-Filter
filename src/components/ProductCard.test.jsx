import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect,  } from 'vitest';
import '@testing-library/jest-dom';

import ProductCard from './ProductCard';

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
    const prdCard = render(<ProductCard {...dummyCarDetails} />);
    // expect(prdCard).toMatchSnapshot()
    
    expect(screen.getByText(dummyCarDetails.carName)).toBeInTheDocument();
    expect(screen.getByText(dummyCarDetails.price)).toBeInTheDocument();
    expect(screen.getByText(dummyCarDetails.km)).toBeInTheDocument();
    expect(screen.getByText(dummyCarDetails.fuel)).toBeInTheDocument();
    expect(screen.getByText(dummyCarDetails.cityName)).toBeInTheDocument();
  });
});
