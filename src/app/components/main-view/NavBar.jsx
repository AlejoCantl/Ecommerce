import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './navbar.module.css';

const Navbar = ({
  cartCount,
  searchQuery,
  setSearchQuery,
  setIsCartOpen,
  isUserMenuOpen,
  setIsUserMenuOpen,
  isAuthenticated,
  setIsAuthenticated,
  userName,
}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <h1>TechStore</h1>
        </div>
        <div className={styles.searchBar}>
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
              <div className={styles.userDropdown}>
                {isAuthenticated ? (
                  <>
                    <div className={styles.userInfo}>
                      <p>Hola, {userName}</p>
                    </div>
                    <a
                      href="https://readdy.ai/home/eee6cda2-75a6-42e3-a8e4-a928e00069c0/8163e82a-1ace-4439-93e6-692486cd4a9e"
                      data-readdy="true"
                      className={styles.dropdownItem}
                    >
                      <i className="fas fa-user-circle"></i> Mi Perfil
                    </a>
                    <a
                      href="https://readdy.ai/home/eee6cda2-75a6-42e3-a8e4-a928e00069c0/9043d736-7b76-4ead-b259-b61319f702c1"
                      data-readdy="true"
                      className={styles.dropdownItem}
                    >
                      <i className="fas fa-shopping-bag"></i> Mis Pedidos
                    </a>
                    <button
                      onClick={() => {
                        setIsAuthenticated(false);
                        setIsUserMenuOpen(false);
                      }}
                      className={styles.logoutButton}
                    >
                      <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="#"
                      onClick={() => {
                        setIsAuthenticated(true);
                        setIsUserMenuOpen(false);
                      }}
                      className={styles.dropdownItem}
                    >
                      <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                    </a>
                    <a href="#" className={styles.dropdownItem}>
                      <i className="fas fa-user-plus"></i> Registrarse
                    </a>
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
    </nav>
  );
};

export default Navbar;