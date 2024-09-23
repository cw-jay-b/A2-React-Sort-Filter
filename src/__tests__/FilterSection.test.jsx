import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import FilterSection from '../components/FilterSection';

describe('Sort Filter Tests', ()=>{
it('should match snapshot with default props', () => {
    const { asFragment } = render(
        <FilterSection
        selectedFuel={[]}
        setSelectedFuel={() => {}}
        setPriceRange={() => {}}
        handleClearAll={() => {}}
        resultCount={0}
        />
    );
    expect(asFragment()).toMatchSnapshot();
    });
    
    it('should match snapshot with selected fuels and price range', () => {
    const { asFragment } = render(
        <FilterSection
        selectedFuel={[1, 3]} // Example of selected fuels
        setSelectedFuel={() => {}}
        setPriceRange={() => {}}
        handleClearAll={() => {}}
        resultCount={10}
        />
    );
    expect(asFragment()).toMatchSnapshot();
    });
});