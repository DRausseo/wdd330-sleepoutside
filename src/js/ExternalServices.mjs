// src/js/ExternalServices.mjs
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    // Lanza un objeto con más detalles del error que el servidor devolvió
    throw {
      name: "servicesError",
      message: jsonResponse, // Este es el objeto con errores detallados
    };
  }
}

export default class ExternalServices {
  async checkout(order) {
    const url = `${baseURL}/checkout`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    const response = await fetch(url, options);
    return convertToJson(response); // Usamos la nueva función aquí
  }
}
