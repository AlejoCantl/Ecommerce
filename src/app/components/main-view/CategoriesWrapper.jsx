'use client';
import { useState } from 'react';
import Categories from '@/app/components/main-view/Categories';
import Products from '@/app/components/main-view/Products';

const CategoriesWrapper = ({ products, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  return (
    <>
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <Products products={products} selectedCategory={selectedCategory} />
    </>
  );
};

export default CategoriesWrapper;