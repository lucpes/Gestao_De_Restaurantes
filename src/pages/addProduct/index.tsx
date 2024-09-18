import React, { useState, useEffect } from 'react';
import { getCategories, createProduct } from '../../Firebase/firebaseConfig';
import Button from "../../components/Button"; // Adjusted the path to the correct location
import './style.scss';

interface Category {
  id: string;
  name: string;
  subcategories: { name: string, products: { name: string, quantity: number, unit: string }[] }[];
}

const AddProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productUnit, setProductUnit] = useState('g');

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      const formattedCategories = categories.map((category: any) => ({
        id: category.id,
        name: category.name,
        subcategories: category.subcategories.map((subcategory: any) => ({
          name: subcategory.name,
          products: subcategory.products.map((product: any) => ({
            name: product.name,
            quantity: product.quantity,
            unit: product.unit
          }))
        }))
      }));
      setCategories(formattedCategories);
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
  };

  const handleAddProduct = async () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    const subcategory = category?.subcategories.find(sub => sub.name === selectedSubcategory);
    if (category && subcategory) {
      await createProduct({
        categoryId: category.id,
        subcategoryName: subcategory.name,
        name: productName,
        quantity: parseFloat(productQuantity),
        unit: productUnit
      });
      setProductName('');
      setProductQuantity('');
      setProductUnit('g');
    }
  };

  return (
    <div className="add-product-container">
      <h1>Adicionar Produto</h1>
      <div className="form-group">
        <label htmlFor="category">Categoria</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Selecione uma categoria</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory && (
        <div className="form-group">
          <label htmlFor="subcategory">Subcategoria</label>
          <select id="subcategory" value={selectedSubcategory} onChange={handleSubcategoryChange}>
            <option value="">Selecione uma subcategoria</option>
            {categories.find(cat => cat.id === selectedCategory)?.subcategories.map(subcategory => (
              <option key={subcategory.name} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedSubcategory && (
        <div className="form-group">
          <label htmlFor="productName">Nome do Produto</label>
          <input
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nome do Produto"
          />
        </div>
      )}
      {selectedSubcategory && (
        <div className="form-group">
          <label htmlFor="productQuantity">Quantidade</label>
          <input
            id="productQuantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            placeholder="Quantidade"
            type="number"
          />
        </div>
      )}
      {selectedSubcategory && (
        <div className="form-group">
          <label htmlFor="productUnit">Unidade</label>
          <select id="productUnit" value={productUnit} onChange={(e) => setProductUnit(e.target.value)}>
            <option value="g">g</option>
            <option value="kg">kg</option>
          </select>
        </div>
      )}
      {selectedSubcategory && (
        <div className="form-group">
          <Button onClick={handleAddProduct}>Adicionar Produto</Button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;