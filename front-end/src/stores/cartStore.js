import { writable, derived } from "svelte/store";

// Creamos un store con un arreglo vacío (carrito vacío)
export const cart = writable([]);

// Función para agregar un producto al carrito
export function addToCart(product) {
  cart.update((currentCart) => {
    // Comprobamos si el producto ya está en el carrito
    const existingProduct = currentCart.find(
      (item) => item.name === product.name
    );

    if (existingProduct) {
      // Si el producto ya existe, aumentamos la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      currentCart.push({ ...product, quantity: 1 });
    }

    return currentCart;
  });

  // Mostramos el offcanvas
  showOffcanvas();
}

// Función para quitar un producto del carrito
export function removeFromCart(id) {
  cart.update((currentCart) => {
    return currentCart
      .map((item) => {
        // Si el producto tiene el id que se va a eliminar
        if (item.id === id) {
          // Si la cantidad es mayor a 1, reduce la cantidad
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Si la cantidad es 1, elimina el producto
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null); // Filtra los elementos nulos (productos eliminados)
  });
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
