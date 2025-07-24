// apiService.js

class ApiService {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async fetchData(endpoint, options = {}) {
    const url = `${this.baseUrl}/${endpoint}`;
    const defaultHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${this.token}`,
    };

    const config = {
      method: options.method || "GET",
      mode: "cors",
      headers: { ...defaultHeaders, ...options.headers },
      ...(options.body && { body: JSON.stringify(options.body) }),
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorData.message || JSON.stringify(errorData)
          }`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw to allow caller to handle
    }
  }
}

// Exportar la instancia o la clase para ser utilizada en otros módulos
// Por simplicidad, exportaremos la clase para que pueda ser instanciada con diferentes configuraciones si es necesario.
export default ApiService;
