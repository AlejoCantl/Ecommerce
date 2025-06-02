import Image from "next/image";
import styles from "./page.module.css";
import ListItems from "./components/ListItems";

const items = [
  {
    name: "Producto 1",
    description: "Descripción del producto 1",
    price : 100,
    stock: 10,
  },
  {
    name: "Producto 2",
    description: "Descripción del producto 2",
    price: 200,
    stock: 0,
  },
  {
    name: "Producto 3",
    description: "Descripción del producto 3",
    price: 300,
    stock: 5,
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        <h1 className={styles.title}> Ecommerce</h1>
        <ListItems items={items} />
      </main>
      </div>
  );
}
