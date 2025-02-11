// Importando el store writable de Svelte para gestionar el carrito
import { writable } from "svelte/store";

export const URL_API =
  "http://localhost/tienda-online-con-svelte-php-y-mysql/backend-php/index.php";

export const cart = writable([]); // Creamos un store con un arreglo vacío (carrito vacío)

export async function getProductsCart() {
  try {
    const response = await fetch(`${URL_API}?action=getProductsCart`);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Carrito recibido del backend:", data);

    // Actualizamos el carrito en el store
    cart.set(data);
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
  }
}
