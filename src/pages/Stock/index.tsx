import React, { useState, useEffect } from 'react';
import { getCategories } from '../../Firebase/firebaseConfig';
import './style.scss';

interface Product {
  name: string;
  quantity: number;
  unit: string;
}

interface Subcategory {
  name: string;
  products: Product[];
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const Stock = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      const formattedCategories: Category[] = categories.map((category: any) => ({
        id: category.id,
        name: category.name,
        subcategories: category.subcategories.map((subcategory: any) => ({
          name: subcategory.name,
          products: subcategory.products.map((product: any) => ({
            name: product.name,
            quantity: product.quantity,
            unit: product.unit,
          })),
        })),
      }));
      setCategories(formattedCategories);
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
    setProducts([]);
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategoryName = event.target.value;
    setSelectedSubcategory(subcategoryName);
    const category = categories.find(cat => cat.id === selectedCategory);
    const subcategory = category?.subcategories.find(sub => sub.name === subcategoryName);
    setProducts(subcategory ? subcategory.products : []);
  };

  return (
    <div className="stock-container">
      <h1>Estoque</h1>
      <div className="form-group">
        <label htmlFor="category">Categoria</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="subcategory">Subcategoria</label>
        <select id="subcategory" value={selectedSubcategory} onChange={handleSubcategoryChange}>
          <option value="">Selecione uma subcategoria</option>
          {categories.find(cat => cat.id === selectedCategory)?.subcategories.map((subcategory) => (
            <option key={subcategory.name} value={subcategory.name}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list">
        <h2>Produtos</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.name}>
                {product.name} - {product.quantity} {product.unit}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Stock;