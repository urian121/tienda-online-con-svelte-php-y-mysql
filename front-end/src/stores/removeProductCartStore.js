import { getProductsCart, URL_API } from "./cartStore";

/**
 * Función para eliminar un producto del carrito
 */
export async function removeProductCart(id) {
  try {
    const response = await fetch(`${URL_API}?action=removeProductCart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    if (result.success) {
      await getProductsCart(); // Recarga el carrito desde el backend
    } else {
      console.error("Error al eliminar del carrito:", result.message);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}