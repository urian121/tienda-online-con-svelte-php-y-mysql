import { writable, derived } from "svelte/store";
let URL_API =
  "http://localhost/tienda-onlne-con-svelte-php-y-mysql/backend-php/index.php";
let URL_API_GET_CART =
  "http://localhost/tienda-onlne-con-svelte-php-y-mysql/backend-php/index.php?action=getCart";

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
    cafes.set(data); // 🔹 Guardamos los productos en el store
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}
export async function getCart() {
  try {
    const response = await fetch(`${URL_API_GET_CART}?action=getCart`);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    cart.set(data);
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
  }
}

// Función para agregar un producto al carrito
export async function addToCart(product) {
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

    const contactoCreado = await response.json(); // Convertimos la respuesta a JSON
    console.log("Producto agregado al carrito:", contactoCreado);
    cart.update((currentCart) => [...currentCart, contactoCreado]);
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
      cart.update((currentCart) => {
        return currentCart
          .map((item) => {
            if (item.id === id) {
              return item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : null;
            }
            return item;
          })
          .filter((item) => item !== null);
      });
    } else {
      console.error("Error al eliminar del carrito:", result.message);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}


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
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
});
