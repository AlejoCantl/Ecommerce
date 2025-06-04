"use client";
import React, { useState } from 'react';
import Navbar from '@/app/components/main-view/NavBar';
import CartModal from '@/app/components/cart-view/CartModal';
import Categories from '@/app/components/main-view/Categories';
import Products from '@/app/components/Products';
import Footer from '@/app/components/Footer';
import styles from './page.module.css';	
import { useCart } from './components/cart-view/CartContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName] = useState('Usuario');
  const {setIsCartOpen} = useCart();

  // const addToCart = (product) => {
  //   const existingItem = cartItems.find((item) => item.id === product.id);
  //   if (existingItem) {
  //     setCartItems(
  //       cartItems.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...product, quantity: 1 }]);
  //   }
  //   setCartCount((prev) => prev + 1);
  // };

  // const removeFromCart = (productId) => {
  //   const item = cartItems.find((item) => item.id === productId);
  //   if (item) {
  //     setCartCount((prev) => prev - item.quantity);
  //     setCartItems(cartItems.filter((item) => item.id !== productId));
  //   }
  // };

  // const updateQuantity = (productId, newQuantity) => {
  //   if (newQuantity < 1) return;
  //   const item = cartItems.find((item) => item.id === productId);
  //   if (item) {
  //     setCartItems(
  //       cartItems.map((item) =>
  //         item.id === productId ? { ...item, quantity: newQuantity } : item
  //       )
  //     );
  //     setCartCount(
  //       cartItems.reduce((total, item) =>
  //         item.id === productId
  //           ? total - item.quantity + newQuantity
  //           : total + item.quantity,
  //         0
  //       )
  //     );
  //   }
  // };

  // const calculateTotal = () => {
  //   return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

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
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsCartOpen={setIsCartOpen}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userName={userName}
      />
      <CartModal
        setIsCartOpen={setIsCartOpen}
      />
      <main className={styles.main}>
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Products
          products={products}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;