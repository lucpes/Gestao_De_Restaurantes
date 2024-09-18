import React from 'react';
import CategoryComponent from '../../components/Category';
import ProductComponent from '../../components/Product';
import './style.scss';

const Stock = () => {
  return (
    <div className="stock-container">
      <h1>Stock Management</h1>
      <CategoryComponent />
      <ProductComponent />
    </div>
  );
};

export default Stock;