import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory, addSubcategory, removeSubcategory, createProduct, updateProduct, deleteProduct } from '../../Firebase/firebaseConfig';
import Button from "../../components/Button";
import Input from "../../components/Input";
import './style.scss';

interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface Subcategory {
  id: string;
  name: string;
  products: Product[];
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const AddProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productUnit, setProductUnit] = useState('g');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      const formattedCategories = categories.map((category: any) => ({
        ...category,
        subcategories: category.subcategories.map((subcategory: any) => ({
          ...subcategory,
          id: subcategory.id || '', // Ensure id is present
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
    const category = categories.find(cat => cat.id === categoryId);
    setProducts(category ? category.subcategories.flatMap(sub => sub.products) : []);
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategoryId = event.target.value;
    setSelectedSubcategory(subcategoryId);
    const category = categories.find(cat => cat.id === selectedCategory);
    const subcategory = category?.subcategories.find(sub => sub.id === subcategoryId);
    setProducts(subcategory ? subcategory.products : []);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      const categoryId = await createCategory({ name: newCategory });
      setCategories([...categories, { id: categoryId, name: newCategory, subcategories: [] }]);
      setNewCategory('');
    }
  };

  const handleAddSubcategory = async () => {
    if (selectedCategory && newSubcategory.trim()) {
      const subcategoryId = await addSubcategory(selectedCategory, { name: newSubcategory });
      const updatedCategories = categories.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            subcategories: [...category.subcategories, { id: subcategoryId, name: newSubcategory, products: [] }]
          };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewSubcategory('');
    }
  };

  const handleAddProduct = async () => {
    if (selectedCategory && selectedSubcategory && productName.trim() && productQuantity.trim()) {
      const productId = await createProduct({
        categoryId: selectedCategory,
        subcategoryId: selectedSubcategory,
        name: productName,
        quantity: parseFloat(productQuantity),
        unit: productUnit
      });
      const updatedCategories = categories.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            subcategories: category.subcategories.map(subcategory => {
              if (subcategory.id === selectedSubcategory) {
                return {
                  ...subcategory,
                  products: [...subcategory.products, { id: productId, name: productName, quantity: parseFloat(productQuantity), unit: productUnit }]
                };
              }
              return subcategory;
            })
          };
        }
        return category;
      });
      setCategories(updatedCategories);
      setProductName('');
      setProductQuantity('');
      setProductUnit('g');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      await deleteCategory(categoryId);
      setCategories(categories.filter(category => category.id !== categoryId));
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta subcategoria?')) {
      await removeSubcategory(selectedCategory, subcategoryId);
      const updatedCategories = categories.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            subcategories: category.subcategories.filter(subcategory => subcategory.id !== subcategoryId)
          };
        }
        return category;
      });
      setCategories(updatedCategories);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await deleteProduct(selectedSubcategory, productId);
      const updatedCategories = categories.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            subcategories: category.subcategories.map(subcategory => {
              if (subcategory.id === selectedSubcategory) {
                return {
                  ...subcategory,
                  products: subcategory.products.filter(product => product.id !== productId)
                };
              }
              return subcategory;
            })
          };
        }
        return category;
      });
      setCategories(updatedCategories);
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
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nova Categoria"
        />
        <Button onClick={handleAddCategory}>Adicionar Categoria</Button>
      </div>
      {selectedCategory && (
        <div className="form-group">
          <label htmlFor="subcategory">Subcategoria</label>
          <select id="subcategory" value={selectedSubcategory} onChange={handleSubcategoryChange}>
            <option value="">Selecione uma subcategoria</option>
            {categories.find(cat => cat.id === selectedCategory)?.subcategories.map(subcategory => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          <Input
            type="text"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            placeholder="Nova Subcategoria"
          />
          <Button onClick={handleAddSubcategory}>Adicionar Subcategoria</Button>
        </div>
      )}
      {selectedSubcategory && (
        <>
          <div className="form-group">
            <label htmlFor="productName">Nome do Produto</label>
            <input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nome do Produto"
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="productUnit">Unidade</label>
            <select id="productUnit" value={productUnit} onChange={(e) => setProductUnit(e.target.value)}>
              <option value="g">g</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <Button onClick={handleAddProduct}>Adicionar Produto</Button>
          <div className="product-list">
            <h2>Produtos</h2>
            {products.length > 0 ? (
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    {product.name} - {product.quantity} {product.unit}
                    <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddProduct;