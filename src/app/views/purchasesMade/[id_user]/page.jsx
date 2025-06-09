import { purchaseMadeHandler } from '@/utils/request';
import PurchasedProducts from '../purchaseView';

export default async function PurchasesMadePage({ params }) {
  const { id_user } = await params;

  // Validate id_user
  if (isNaN(id_user) || id_user <= 0) {
    return (
      <div className="container">
        <h1>Error al cargar las compras realizadas</h1>
        <p>El ID de usuario no es válido</p>
      </div>
    );
  }

  let purchases = [];

  try {
    const response = await purchaseMadeHandler(id_user);

    if (!response.ok) {
      throw new Error(response.error || 'Error al obtener las compras realizadas');
    }

    purchases = response.data || [];

    if (!purchases.length) {
      return (
        <div className="container">
          <h1>No se encontraron compras realizadas</h1>
        </div>
      );
    }

    return <PurchasedProducts purchases={purchases} />;
  } catch (error) {
    console.error('Error al obtener las compras realizadas:', error);
    return (
      <div className="container">
        <h1>Error al cargar las compras realizadas</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}