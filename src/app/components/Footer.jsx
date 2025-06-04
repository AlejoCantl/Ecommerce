import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div>
          <h3>Sobre Nosotros</h3>
          <ul className={styles.footerList}>
            <li>Quiénes Somos</li>
            <li>Contacto</li>
            <li>Trabaja con Nosotros</li>
          </ul>
        </div>
        <div>
          <h3>Ayuda</h3>
          <ul className={styles.footerList}>
            <li>Centro de Ayuda</li>
            <li>Devoluciones</li>
            <li>Términos y Condiciones</li>
          </ul>
        </div>
        <div>
          <h3>Métodos de Pago</h3>
          <div className={styles.paymentIcons}>
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
          </div>
        </div>
        <div>
          <h3>Síguenos</h3>
          <div className={styles.socialIcons}>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 TechStore. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;