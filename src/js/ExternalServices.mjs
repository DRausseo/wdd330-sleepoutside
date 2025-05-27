// src/js/ExternalServices.mjs
const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  async checkout(order) {
    const url = `${baseURL}/checkout`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to submit order");
    return await response.json();
  }
}
