import { derived } from "svelte/store"; // Importando el store derived de Svelte para crear un store derivado
import { cart } from "./cartStore";

/**
 * Función para calcular el subtotal (store derivado)
 * Creando un store derivado (derived) para que el subtotal se actualice automáticamente cuando cambie el carrito
 */
export const subtotal = derived(cart, ($cart) => {
  return $cart
    .reduce((total, item) => total + item.price * item.cantidad, 0)
    .toFixed(2);
});
