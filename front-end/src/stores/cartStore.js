import { writable, derived } from "svelte/store";

let URL_API =
  "http://localhost/tienda-onlne-con-svelte-php-y-mysql/backend-php/index.php";

// Creamos un store con un arreglo vacío (carrito vacío)
export const cart = writable([]);
export const cafes = writable([]); // 🔹 Creamos un store para productos

export async function getProducts() {
  try {
    const response = await fetch(`${URL_API}?action=getProducts`);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Productos recibidos del backend:", data);
    cafes.set(data); // 🔹 Guardamos los productos en el store
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}

export async function getCart() {
  try {
    const response = await fetch(`${URL_API}?action=getCart`);
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

// Función para agregar un producto al carrito
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
    await getCart();
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }

  // Mostramos el offcanvas
  showOffcanvas();
}

// Función para quitar un producto del carrito
export async function removeFromCart(id) {
  try {
    const response = await fetch(`${URL_API}?action=removeFromCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();

    if (result.success) {
      await getCart(); // 🔹 Recarga el carrito desde el backend
    } else {
      console.error("Error al eliminar del carrito:", result.message);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

// Función para mostrar el offcanvas
function showOffcanvas() {
  const offcanvasElement = document.getElementById("offcanvasRight");
  offcanvasElement.classList.add("show");
}

/**
 * Función para calcular el subtotal (store derivado)
 * Creando un store derivado (derived) para que el subtotal se actualice automáticamente cuando cambie el carrito
 */
export const subtotal = derived(cart, ($cart) => {
  return $cart
    .reduce((total, item) => total + item.price * item.cantidad, 0)
    .toFixed(2);
});
