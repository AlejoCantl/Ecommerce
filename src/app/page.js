"use client";
import React, { useState } from 'react';
import Navbar from '@/app/components/main-view/NavBar';
import CartModal from '@/app/components/cart-view/CartModal';
import Categories from '@/app/components/main-view/Categories';
import Products from '@/app/components/Products';
import Footer from '@/app/components/Footer';
import styles from './page.module.css';	

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const products = [
    {
      id: 1,
      name: 'Teléfono Inteligente Premium',
      price: 799.99,
      rating: 4.5,
      category: 'Teléfonos',
      image:
        'https://readdy.ai/api/search-image?query=modern%20premium%20smartphone%20with%20sleek%20design%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=1&orientation=squarish',
      description: 'El último modelo con características avanzadas',
    },
    {
      id: 2,
      name: 'Laptop Ultradelgada',
      price: 1299.99,
      rating: 4.8,
      category: 'Laptops',
      image:
        'https://readdy.ai/api/search-image?query=sleek%20modern%20laptop%20with%20metallic%20finish%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=2&orientation=squarish',
      description: 'Potente y portátil para profesionales',
    },
    {
      id: 3,
      name: 'Auriculares Inalámbricos',
      price: 199.99,
      rating: 4.3,
      category: 'Auriculares',
      image:
        'https://readdy.ai/api/search-image?query=premium%20wireless%20headphones%20with%20modern%20design%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=3&orientation=squarish',
      description: 'Sonido excepcional y máxima comodidad',
    },
    {
      id: 4,
      name: 'Cargador Rápido USB-C',
      price: 29.99,
      rating: 4.2,
      category: 'Accesorios',
      image:
        'https://readdy.ai/api/search-image?query=modern%20usb%20c%20charger%20with%20sleek%20design%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=4&orientation=squarish',
      description: 'Carga rápida para todos tus dispositivos',
    },
    {
      id: 5,
      name: 'Smartphone Básico',
      price: 299.99,
      rating: 4.0,
      category: 'Teléfonos',
      image:
        'https://readdy.ai/api/search-image?query=basic%20smartphone%20with%20modern%20design%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=5&orientation=squarish',
      description: 'Perfecto para uso diario',
    },
    {
      id: 6,
      name: 'Laptop Gaming',
      price: 1599.99,
      rating: 4.7,
      category: 'Laptops',
      image:
        'https://readdy.ai/api/search-image?query=gaming%20laptop%20with%20rgb%20lighting%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=6&orientation=squarish',
      description: 'Máximo rendimiento para gaming',
    },
  ];

  return (
    <div className={styles.app}>
      <Navbar/>
      <CartModal/>
      <main className={styles.main}>
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Products
          products={products}
          selectedCategory={selectedCategory}/>
      </main>
      <Footer />
    </div>
  );
};

export default Home;