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

const CategoryComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <div className="category-container">
      <h1>Categorias</h1>
      {/* Render categories and subcategories */}
    </div>
  );
};

export default CategoryComponent;