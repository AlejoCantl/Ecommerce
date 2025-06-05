import Navbar from '@/app/components/main-view/NavBar';
import CartModal from '@/app/components/cart-view/CartModal';
import CategoriesWrapper from '@/app/components/main-view/CategoriesWrapper';
import Footer from '@/app/components/Footer';
import styles from './page.module.css';
import { fetchData } from '@/utils/request';

// Server Component with async data fetching
export default async function Home() {
  let products = [];
  let categories = [];
  try {
    products = await fetchData('http://localhost:8000/products', 'GET', {
      next: { revalidate: 60 }, // Incremental Static Regeneration (ISR)
    });

    categories = await fetchData('http://localhost:8000/categories', 'GET', {
      next: { revalidate: 60 }, // Incremental Static Regeneration (ISR)
    });
    categories = ['Todos', ...new Set(categories.map(category => category.nombre))];
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
    categories = ['Todos'];
  }

  return (
    <div className={styles.app}>
      <Navbar />
      <CartModal />
      <main className={styles.main}>
        <CategoriesWrapper products={products} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}