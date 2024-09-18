import React, { useState, useEffect } from 'react';
import { getProducts } from '../../Firebase/firebaseConfig';
import './style.scss';

interface Product {
  id: string;
  name: string;
  supplier: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  price: number;
}

const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const products: Product[] = await getProducts();
      setProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.supplier}</span>
            <span>{product.expiryDate}</span>
            <span>{product.quantity}</span>
            <span>{product.unit}</span>
            <span>{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComponent;