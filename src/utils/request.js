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