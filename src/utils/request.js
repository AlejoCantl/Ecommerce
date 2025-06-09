'use server';

export const fetchData = async (url, method = 'GET') => {
  try {
    if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
      throw new Error(`Método HTTP no válido: ${method}`);
    }
    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: method !== 'GET' ? { 'Content-Type': 'application/json' } : {}, // Solo enviar Content-Type para métodos que lo necesitan
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const loginHandler = async (username, password) => {
  const url = 'http://localhost:8000/login';
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