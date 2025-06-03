import styles from './categories.module.css';

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['Todos', 'Teléfonos', 'Laptops', 'Auriculares', 'Accesorios'];

  return (
    <div className={styles.categories}>
      <h2>Categorías</h2>
      <div className={styles.categoryGrid}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${styles.categoryCard} ${
              selectedCategory === category ? styles.categoryCardActive : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <i
              className={`fas fa-${
                index === 0
                  ? 'th-large'
                  : index === 1
                  ? 'mobile-alt'
                  : index === 2
                  ? 'laptop'
                  : index === 3
                  ? 'headphones'
                  : 'plug'
              } ${styles.categoryIcon} ${
                selectedCategory === category ? styles.categoryIconActive : ''
              }`}
            ></i>
            <h3
              className={
                selectedCategory === category ? styles.categoryTitleActive : ''
              }
            >
              {category}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;