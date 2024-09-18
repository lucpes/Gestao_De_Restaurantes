import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddProduct from './index';
import { getCategories } from '../../Firebase/firebaseConfig';

// Mock the getCategories function
jest.mock('../../Firebase/firebaseConfig', () => ({
  getCategories: jest.fn(),
}));

const mockCategories = [
  { id: '1', name: 'Categoria 1', subcategories: ['Subcategoria 1', 'Subcategoria 2'] },
  { id: '2', name: 'Categoria 2', subcategories: ['Subcategoria 3', 'Subcategoria 4'] },
];

describe('AddProduct Component', () => {
  beforeEach(() => {
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  test('renders without crashing', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    expect(screen.getByText('Adicionar Produto')).toBeInTheDocument();
  });

  test('renders categories correctly', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const categorySelect = await screen.findByLabelText('Categoria');
    fireEvent.change(categorySelect, { target: { value: '1' } });

    await waitFor(() => {
      expect((categorySelect as HTMLSelectElement).value).toBe('1');
    });
  });

  test('renders subcategories correctly', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const categorySelect = await screen.findByLabelText('Categoria');
    fireEvent.change(categorySelect, { target: { value: '1' } });

    await waitFor(() => {
      const subcategorySelect = screen.getByLabelText('Subcategoria');
      fireEvent.change(subcategorySelect, { target: { value: 'Subcategoria 1' } });
      expect((subcategorySelect as HTMLSelectElement).value).toBe('Subcategoria 1');
    });
  });

  test('handles invalid category selection', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const categorySelect = await screen.findByLabelText('Categoria');
    fireEvent.change(categorySelect, { target: { value: 'invalid' } });

    await waitFor(() => {
      expect((categorySelect as HTMLSelectElement).value).toBe('');
    });
  });

  test('handles invalid subcategory selection', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<AddProduct />);
    });
    const categorySelect = await screen.findByLabelText('Categoria');
    fireEvent.change(categorySelect, { target: { value: '1' } });

    await waitFor(() => {
      const subcategorySelect = screen.getByLabelText('Subcategoria');
      fireEvent.change(subcategorySelect, { target: { value: 'invalid' } });
      expect((subcategorySelect as HTMLSelectElement).value).toBe('');
    });
  });
});