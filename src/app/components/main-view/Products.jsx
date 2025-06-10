import Image from 'next/image';
import styles from './product.module.css';
import { useCart } from '../cart-view/CartContext'; // Adjust the import path as necessary
import { useNavBarContext } from './NavBarContext'; // Adjust the import path as necessary

const Products = ({ products, selectedCategory }) => {
  const { addToCart } = useCart();
  const { searchQuery } = useNavBarContext();

  return (
    <div className={styles.productsGrid}>
      {products
        .filter(
          (product) =>
            selectedCategory === 'Todos' ||
            product.category_product.some(
              (cat) => cat.category.nombre === selectedCategory
            )
        )
        .filter((product) =>
          product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image
                src={product.imagen}
                alt={product.nombre}
                width={400}
                height={400}
                className={styles.productImage}
                sizes="(max-width: 400px) 100vw, 400px"
                priority= {product.id <= 2} // Optimize LCP for first few images
                loading={product.id <= 2 ? 'eager' : 'lazy'}
              />
            </div>
            <div className={styles.productDetails}>
              <h3>{product.nombre}</h3>
              <p>{product.descripcion}</p>
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
                <span>${product.precio}</span>
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