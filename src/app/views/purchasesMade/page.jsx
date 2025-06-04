import styles from './purchasesMade.module.css';

const products = [
  { id: 1, name: 'Teléfono Inteligente Premium', price: 799.99, image: 'https://readdy.ai/api/search-image?query=modern%20premium%20smartphone%20with%20sleek%20design%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=1&orientation=squarish' },
  { id: 2, name: 'Laptop Ultradelgada', price: 1299.99, image: 'https://readdy.ai/api/search-image?query=sleek%20modern%20laptop%20with%20metallic%20finish%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=2&orientation=squarish' },
  { id: 3, name: 'Auriculares Inalámbricos', price: 199.99, image: 'https://readdy.ai/api/search-image?query=premium%20wireless%20headphones%20with%20modern%20design%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=3&orientation=squarish' },
  { id: 4, name: 'Cargador Rápido USB-C', price: 29.99, image: 'https://readdy.ai/api/search-image?query=modern%20usb%20c%20charger%20with%20sleek%20design%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=4&orientation=squarish' },
  { id: 5, name: 'Smartphone Básico', price: 299.99, image: 'https://readdy.ai/api/search-image?query=basic%20smartphone%20with%20modern%20design%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=5&orientation=squarish' },
  { id: 6, name: 'Laptop Gaming', price: 1599.99, image: 'https://readdy.ai/api/search-image?query=gaming%20laptop%20with%20rgb%20lighting%20on%20minimal%20light%20gray%20background%20perfect%20product%20photography%20with%20soft%20shadows%20and%20clean%20composition&width=400&height=400&seq=6&orientation=squarish' },
];

const purchases = [
  { id: 1, quantity: 2 },
  { id: 2, quantity: 1 },
  { id: 3, quantity: 3 },
  { id: 4, quantity: 1 },
  { id: 5, quantity: 1 },
  { id: 6, quantity: 2 },
  { id: 1, quantity: 1 }, // Compra repetida
];

// Agrupar productos repetidos
const mergedPurchases = purchases.reduce((acc, item) => {
  const existing = acc.find(p => p.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    acc.push({ ...item });
  }
  return acc;
}, []);

export default function PurchasedProducts() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Compras realizadas</h1>
      <div className={styles.tableContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {mergedPurchases.map(({ id, quantity }) => {
              const product = products.find(p => p.id === id);
              return (
                <tr key={id}>
                  <td className={styles.productCell}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                    {product.name}
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td className={styles.alinearText}>{quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
