"use client";
import styles from './cartModal.module.css';
import { useCart } from './CartContext';
import { useNavBarContext } from '../main-view/NavBarContext';
import { cartHandler } from '@/utils/request'; // Adjust path as needed
import Image from 'next/image';

const CartModal = () => {
  // Hooks called at the top level
  const { isCartOpen, cart: cartItems, removeFromCart, updateQuantity, getTotalPrice: calculateTotal, setIsCartOpen, clearCart } = useCart();
  const { userName, setShowLoginModal } = useNavBarContext();

  // Safely access id_user
  const id_user = userName?.id_user || null;

  const handleBuy = async () => {
    // Check if user is logged in
    if (id_user === null || id_user === '') {
      setShowLoginModal(true);
      setIsCartOpen(false);
      return;
    }

    try {
      // Map cartItems to match backend expected format
      const items = cartItems.items.map(item => ({
        id_product: item.id,
        quantity: item.quantity,
      }));

      const response = await cartHandler(items, id_user);

      if (!response.ok) {
        console.error('Error adding to cart:', response.error);
        alert('Error adding to cart: ' + response.error);
        return;
      }

      console.log('Cart updated:', response.msg);
      alert(response.msg);
      clearCart();
      setIsCartOpen(false);
    } catch (error) {
      console.error('Unexpected error in handleAddToCart:', error);
      alert('An unexpected error occurred');
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className={styles.cartModalOverlay} onClick={() => setIsCartOpen(false)}></div>
      <div className={styles.cartModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.cartModalContent}>
          <div className={styles.cartHeader}>
            <h3>Carrito de Compras</h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className={styles.closeButton}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          {cartItems.items.length === 0 ? (
            <p className={styles.emptyCart}>Tu carrito está vacío</p>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cartItems.items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <Image
                      width={80}
                      height={80}
                      src={item.imagen}
                      alt={item.nombre}
                      className={styles.cartItemImage}
                      loading='lazy'
                    />
                    <div className={styles.cartItemDetails}>
                      <h4>{item.nombre}</h4>
                      <p>${item.precio}</p>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={styles.quantityButton}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={styles.quantityButton}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={styles.removeButton}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.cartFooter}>
                <div className={styles.cartTotal}>
                  <span>Total:</span>
                  <span>${calculateTotal.toFixed(2)}</span>
                </div>
                <button className={styles.checkoutButton} onClick={handleBuy}>
                  Comprar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;