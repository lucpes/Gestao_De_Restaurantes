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
      console.log('Categorias retornadas:', categories); // Log para verificar os dados retornados

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

      console.log('Categorias formatadas:', formattedCategories); // Log para verificar os dados formatados
      setCategories(formattedCategories);
    }

    fetchCategories();
  }, []);

  return (
    <div className="category-container">
      <h1>Categorias</h1>
      {categories.length > 0 ? (
        categories.map(category => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <ul>
              {category.subcategories.length > 0 ? (
                category.subcategories.map(subcategory => (
                  <li key={subcategory.name}>
                    <h3>{subcategory.name}</h3>
                    <ul>
                      {subcategory.products.length > 0 ? (
                        subcategory.products.map(product => (
                          <li key={product.name}>
                            {product.name} - {product.quantity} {product.unit}
                          </li>
                        ))
                      ) : (
                        <li>Nenhum produto encontrado.</li>
                      )}
                    </ul>
                  </li>
                ))
              ) : (
                <li>Selecione uma Subcategoria</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>Nenhuma categoria encontrada.</p>
      )}
    </div>
  );
};

export default CategoryComponent;