"use client";
import Image from 'next/image';
import styles from './styles.module.css';

const Products = ({ products, selectedCategory, searchQuery, addToCart }) => {
  return (
    <div className={styles.productsGrid}>
      {products
        .filter(
          (product) =>
            selectedCategory === 'Todos' || product.category === selectedCategory
        )
        .filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className={styles.productImage}
              />
            </div>
            <div className={styles.productDetails}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${
                      i < Math.floor(product.rating)
                        ? styles.starFilled
                        : styles.starEmpty
                    }`}
                  ></i>
                ))}
                <span>({product.rating})</span>
              </div>
              <div className={styles.productFooter}>
                <span>${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className={styles.addToCartButton}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;