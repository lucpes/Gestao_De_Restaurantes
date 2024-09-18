import React, { useState, useEffect } from 'react';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../../Firebase/firebaseConfig';
import './style.scss';

interface Category {
  id: string;
  name: string;
}

const CategoryComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    async function fetchCategories() {
      const categories: Category[] = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    const id = await createCategory({ name: newCategory });
    setCategories([...categories, { id, name: newCategory }]);
    setNewCategory('');
  };

  const handleUpdateCategory = async (id: string, name: string) => {
    await updateCategory(id, { name });
    setCategories(categories.map(cat => (cat.id === id ? { ...cat, name } : cat)));
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="category-container">
      <h2>Categories</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={handleAddCategory}>Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleUpdateCategory(category.id, e.target.value)}
            />
            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryComponent;