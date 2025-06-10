import styles from './purchasesMade.module.css';
import NavBar from '@/app/components/main-view/NavBar';
import CartModal from '@/app/components/cart-view/CartModal';
import Image from 'next/image';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';


const convertToColombiaTime = (dateString) => {
  return utcToZonedTime(dateString, 'America/Bogota');
};

const formatColombiaDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};

export default function PurchasedProducts({ purchases }) {
  // Group purchases by date (in Colombia time zone) and id_product
  const groupedByDate = purchases.reduce((acc, purchase) => {
    const dateObj = convertToColombiaTime(purchase.created_at);
    const date = formatColombiaDate(dateObj);

    const { id_product, product } = purchase;

    if (!acc[date]) {
      acc[date] = [];
    }


    const existing = acc[date].find((p) => p.id_product === id_product);

    if (existing) {
      existing.quantity += 1;
    } else {
      acc[date].push({
        id_product,
        quantity: 1,
        product,
      });
    }

    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate)
    .sort((a, b) => new Date(b) - new Date(a));


  return (
    <>
      <NavBar />
      <CartModal />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Compras realizadas</h1>
          {sortedDates.length === 0 ? (
            <p>No hay compras realizadas</p>
          ) : (
            sortedDates.map((date) => {
              const displayDate = new Date(date);
              displayDate.setMinutes(displayDate.getMinutes() + displayDate.getTimezoneOffset());
              return (
                <div key={date} className={styles.dateSection}>
                  <h2 className={styles.dateHeader}>
                    {displayDate.toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'America/Bogota'
                    })}
                  </h2>
                  <div className={styles.tableContainer}>
                    <table className={styles.productTable}>
                      <thead>
                        <tr>
                          <th className={styles.columns1}>Producto</th>
                          <th>Precio</th>
                          <th className={styles.columns2}>Cantidad</th>
                          <th className={styles.columns3}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedByDate[date].map(({ id_product, quantity, product }) => (
                          <tr key={id_product} className={styles.fila}>
                            <td className={styles.productCell}>
                              <Image
                                width={50}
                                height={50}
                                src={product.imagen}
                                alt={product.nombre}
                                className={styles.productImage}
                                loading='lazy'
                              />
                              {product.nombre}
                            </td>
                            <td>${product.precio.toFixed(2)}</td>
                            <td className={styles.alinearText}>{quantity}</td>
                            <td className={styles.alinearText}>
                              ${(product.precio * quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                          <tr>
                            <td className={`${styles.productCell} ${styles.totalMessage}`} colSpan="3">
                              Total compra:
                            </td>
                            <td className={styles.tdFooterTable}></td>
                            <td className={styles.tdFooterTable}></td>
                            <td className={styles.totalAmount}>
                            ${groupedByDate[date].reduce((total, { product, quantity }) => {
                              return total + (product.precio * quantity);
                            }, 0).toFixed(2)}
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>
    </>
  );
}