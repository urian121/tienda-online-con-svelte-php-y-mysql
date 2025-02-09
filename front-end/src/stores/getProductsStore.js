// Importando el store writable de Svelte para gestionar los productos en el carrito
import { writable } from "svelte/store";

export const cafes = writable([]); // Creamos un store para productos
import { URL_API } from "../stores/cartStore";

/**
 * Función para obtener los productos desde el backend construido con PHP
 */
export async function getProducts() {
  try {
    const response = await fetch(`${URL_API}?action=getProducts`);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Productos recibidos del backend:", data);
    cafes.set(data); // Guardamos los productos en el store
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}
