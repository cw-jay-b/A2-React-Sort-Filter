import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SortFilterSection from './SortFilterSection';

describe('Sort Filter Tests', ()=>{
it('should match snapshot with default props', () => {
    const { asFragment } = render(
        <SortFilterSection
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
        <SortFilterSection
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