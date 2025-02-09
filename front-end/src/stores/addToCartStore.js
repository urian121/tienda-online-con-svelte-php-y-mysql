import { getProductsCart, URL_API } from "./cartStore";


export async function addToCart(product) {
  console.log("Producto agregado al carrito:", product);

  try {
    const response = await fetch(`${URL_API}?action=addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const contactoCreado = await response.json();
    console.log("Producto agregado al carrito:", contactoCreado);

    // Después de agregar el producto, obtenemos la versión actualizada del carrito
    await getProductsCart();
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }

  // Mostramos el offcanvas
  showOffcanvas();
}

/**
 * Función para mostrar el offcanvas
 */
export function showOffcanvas() {
  const offcanvasElement = document.getElementById("offcanvasRight");
  offcanvasElement.classList.add("show");
}