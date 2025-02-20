import { Producto } from "../models/Product";

const API_URL = import.meta.env.VITE_API_URL; // Extrae la URL desde .env

export const getProducts = async (): Promise<Producto[]> => {
  if (!API_URL) {
    console.error("❌ API_URL no está definida.");
    return [];
  }

  try {
    
    const response = await fetch(`${API_URL}/SpecialPricesDiscounted`);


    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error("Formato de respuesta inesperado");
    }

    return data.data;
  } catch (error) {
    console.error("❌ Error en getProducts:", error);
    return [];
  }
};
