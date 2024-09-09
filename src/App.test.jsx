import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('App Component', () => {

  it('changes sorting option from ascending to descending', async () => {
    axios.get.mockResolvedValue({
      data: {
        totalCount: 100,
        stocks: [
          {profileId: '1', stockImages:[],priceNumeric: '150000', fuel: 'Petrol' },
          {profileId: '2', stockImages:[],priceNumeric: '250000', fuel: 'Diesel' }
        ]
      }
    });

    render(<App />);

    expect(screen.getByRole('combobox')).toHaveTextContent("Ascending");

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'desc' }
    });

    expect(screen.getByRole('combobox')).toHaveTextContent("Descending");
  });
});
