'use server';

export const fetchData = async (url, method = 'GET') => {
  try {
    if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
      throw new Error(`Método HTTP no válido: ${method}`);
    }

    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: method !== 'GET' ? { 'Content-Type': 'application/json' } : {},
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const loginHandler = async (username, password) => {
  const url = 'https://apiecommerce-production-bee3.up.railway.app/login';
  const method = 'POST';
  const body = JSON.stringify({ 
    nombre_usuario: username, 
    contraseña: password 
  });

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    // Procesar la respuesta para obtener un objeto plano
    const data = await response.json();

    return {
      status: response.status,
      data: data, // Los datos devueltos por la API
      ok: response.ok,
      msg : response.msg
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      status: 500,
      error: error.message,
      ok: false,
    };
  }
};

export const cartHandler = async (cartItems, id_user) => {
  const url = 'https://apiecommerce-production-bee3.up.railway.app/cart';
  const method = 'POST';

  // Ensure cartItems is an array and add id_user to each item if not present
  const items = Array.isArray(cartItems)
    ? cartItems.map(item => ({
        id_user: id_user, // Use item.id_user if available, otherwise use id_user
        id_product: item.id_product,
        quantity: item.quantity
      }))
    : [];

  // Validate that there are items to send
  if (!items.length) {
    return {
      status: 'error',
      error: 'No items provided to add to cart',
      ok: false
    };
  }

  const body = JSON.stringify({ items });

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
      } catch {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const data = await response.json();
    return {
      status: data.status,
      msg: data.msg,
      data: data.data,
      ok: data.status === 'ok'
    };
  } catch (error) {
    console.error('Error during cart operation:', error);
    return {
      status: 'error',
      error: error.message,
      ok: false
    };
  }
};

export const purchaseMadeHandler = async (id_user) => {
  try {
    const url = `https://apiecommerce-production-bee3.up.railway.app/purchases/${id_user}`;
    const method = 'GET';
    const response = await fetchData(url, method);
    console.log('Response from purchaseMadeHandler:', response);
    return {
      status: 'ok', // Assume ok if no error
      msg: 'Purchases retrieved successfully',
      data: response.purchases || [],
      ok: true,
    };
  } catch (error) {
    console.error('Error during purchase made operation:', error);
    return {
      status: 'error',
      error: error.message,
      ok: false,
    };
  }
};