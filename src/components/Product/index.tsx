import React, { useState, useEffect } from 'react';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../../Firebase/firebaseConfig';
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
  const [newProduct, setNewProduct] = useState({
    name: '',
    supplier: '',
    expiryDate: '',
    quantity: 0,
    unit: '',
    price: 0,
  });

  useEffect(() => {
    async function fetchProducts() {
      const products: Product[] = await getProducts();
      setProducts(products);
    }
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const id = await createProduct(newProduct);
    setProducts([...products, { id, ...newProduct }]);
    setNewProduct({
      name: '',
      supplier: '',
      expiryDate: '',
      quantity: 0,
      unit: '',
      price: 0,
    });
  };

  const handleUpdateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    await updateProduct(id, updatedProduct);
    setProducts(products.map(prod => (prod.id === id ? { ...prod, ...updatedProduct } : prod)));
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter(prod => prod.id !== id));
  };

  return (
    <div className="product-container">
      <h2>Products</h2>
      <input
        type="text"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Product Name"
      />
      <input
        type="text"
        value={newProduct.supplier}
        onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
        placeholder="Supplier"
      />
      <input
        type="date"
        value={newProduct.expiryDate}
        onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
        placeholder="Expiry Date"
      />
      <input
        type="number"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
        placeholder="Quantity"
      />
      <input
        type="text"
        value={newProduct.unit}
        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
        placeholder="Unit"
      />
      <input
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        placeholder="Price"
      />
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleUpdateProduct(product.id, { name: e.target.value })}
            />
            <input
              type="text"
              value={product.supplier}
              onChange={(e) => handleUpdateProduct(product.id, { supplier: e.target.value })}
            />
            <input
              type="date"
              value={product.expiryDate}
              onChange={(e) => handleUpdateProduct(product.id, { expiryDate: e.target.value })}
            />
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleUpdateProduct(product.id, { quantity: Number(e.target.value) })}
            />
            <input
              type="text"
              value={product.unit}
              onChange={(e) => handleUpdateProduct(product.id, { unit: e.target.value })}
            />
            <input
              type="number"
              value={product.price}
              onChange={(e) => handleUpdateProduct(product.id, { price: Number(e.target.value) })}
            />
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComponent;