import styles from './cartModal.module.css';

const CartModal = ({
  isCartOpen,
  setIsCartOpen,
  cartItems,
  updateQuantity,
  removeFromCart,
  calculateTotal,
}) => {
  return (
    <>
      {isCartOpen && (
        <div className={styles.cartModal}>
          <div className={styles.cartModalOverlay} onClick={() => setIsCartOpen(false)}></div>
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
            {cartItems.length === 0 ? (
              <p className={styles.emptyCart}>Tu carrito está vacío</p>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.cartItemImage}
                      />
                      <div className={styles.cartItemDetails}>
                        <h4>{item.name}</h4>
                        <p>${item.price}</p>
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
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <button className={styles.checkoutButton}>Proceder al Pago</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;