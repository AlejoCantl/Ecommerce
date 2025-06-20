"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './navbar.module.css';
import { useCart } from '../cart-view/CartContext';
import { useNavBarContext } from './NavBarContext';
import Link from 'next/link';
import { LoginModal } from '../login-modal/LoginModal';
import { useEffect, useRef } from 'react';

const Navbar = () => {
  const {
    searchQuery,
    setSearchQuery,
    isUserMenuOpen,
    setIsUserMenuOpen,
    isAuthenticated,
    userName,
    isPurchasePage,
    showLoginModal,
    setShowLoginModal,
    handleLogout,
  } = useNavBarContext();

  const { nombre, id_user } = userName;
  const { getTotalItems: cartCount, setIsCartOpen } = useCart();

  const userDropdownRef = useRef(null);

  // Handle clicks outside the user menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the dropdown and not on the user icon button
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        !event.target.closest(`#userMenuButton`)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    // Add listener when menu is open
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen, setIsUserMenuOpen]);

  const handleMisComprasClick = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <Link href={'/'}><h1>Infinity/Tech</h1></Link>
        </div>
        <div className={styles.searchBar}>
          {isPurchasePage && (
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <i className={`fas fa-search ${styles.searchIcon}`}></i>
            </div>
          )}
        </div>
        <div className={styles.userCart}>
          <div className={styles.userMenu}>
            <button
              id="userMenuButton"
              className={styles.userIcon}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <i className="fas fa-user"></i>
            </button>
            {isUserMenuOpen && (
              <div className={styles.userDropdown} ref={userDropdownRef}>
                {isAuthenticated ? (
                  <>
                    <div className={styles.userInfo}>
                      <p>Hola, {nombre}</p>
                    </div>
                    {/* <Link
                      href="https://readdy.ai/home/eee6cda2-75a6-42e3-a8e4-a928e00069c0/8163e82a-1ace-4439-93e6-692486cd4a9e"
                      data-readdy="true"
                      className={styles.dropdownItem}
                    >
                      <i className="fas fa-user-circle"></i> Mi Perfil
                    </Link> */}
                    <Link
                      href={id_user ? `/views/purchasesMade/${id_user}` : '#'}
                      data-readdy="true"
                      className={styles.dropdownItem}
                      onClick={id_user ? handleMisComprasClick : null}
                    >
                      <i className="fas fa-shopping-bag"></i> Mis Compras
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={styles.logoutButton}
                    >
                      <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsUserMenuOpen(false);
                      }}
                      className={styles.dropdownItem}
                    >
                      <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                    </a>
                    {/* <a href="#" className={styles.dropdownItem}>
                      <i className="fas fa-user-plus"></i> Registrarse
                    </a> */}
                  </>
                )}
              </div>
            )}
          </div>
          <div className={styles.cartIcon} onClick={() => setIsCartOpen(true)}>
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
      {showLoginModal && <LoginModal />}
    </nav>
  );
};

export default Navbar;