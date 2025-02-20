import { SpecialPrice } from "../models/SpecialPrice";

const API_URL = import.meta.env.VITE_API_URL; // URL de la API en el .env

// 📌 Obtener todos los precios especiales
export const getSpecialPrices = async (): Promise<SpecialPrice[]> => {
  try {
    const response = await fetch(`${API_URL}/SpecialPrices`);
    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

    const { data } = await response.json();
    console.log("📌 Datos obtenidos:", data); // 🔍 Verifica la estructura de datos

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("❌ Error al obtener precios especiales:", error);
    return [];
  }
};

// 📌 Agregar un nuevo precio especial
export const addSpecialPrice = async (specialPrice: SpecialPrice): Promise<boolean> => {
    try {
        if (!specialPrice._id) {
            delete specialPrice._id;
          }  
      const response = await fetch(`${API_URL}/SpecialPrices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specialPrice),
      });
  
      const responseData = await response.json();
      console.log("📥 Respuesta del servidor:", responseData); // 🔍 Muestra la respuesta del backend
  
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
  
      return true;
    } catch (error) {
      console.error("❌ Error al agregar precio especial:", error);
    }  
}
  
// 📌 Editar un precio especial
export const updateSpecialPrice = async (id: string, specialPrice: SpecialPrice): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/SpecialPrices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(specialPrice),
    });

    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

    return true;
  } catch (error) {
    console.error("❌ Error al actualizar precio especial:", error);
    return false;
  }
};

// 📌 Eliminar un precio especial
export const deleteSpecialPrice = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/SpecialPrices/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

    return true;
  } catch (error) {
    console.error("❌ Error al eliminar precio especial:", error);
    return false;
  }
};
