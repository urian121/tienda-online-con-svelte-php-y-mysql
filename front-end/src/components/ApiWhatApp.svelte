<script>
  /*
   * IMPORTANTE: En este componente, necesitamos importar el carrito y el subtotal del store cartStore.
   * subtotal es un store derivado que calcula el total de la compra.
   * En Svelte, cuando importas un writable o derived, necesitas usar el signo $ delante del nombre para extraer su valor.
   * Con $subtotal, Svelte automáticamente se suscribirá al store y actualizará el valor cuando cambie el carrito.
   */

  import { cart } from "../stores/cartStore";
  import { subtotal } from "../stores/subtotalStore";

  function generateWhatsAppMessage() {
    // Construir el mensaje con los productos del carrito
    const cartItems = $cart
      .map((item) => {
        return `${item.name} - ${item.cantidad} x $${item.price}`;
      })
      .join("\n"); // Une todos los productos con salto de línea

    const subtotalCart = $subtotal;
    const message = `¡Hola! Quiero hacer el siguiente pedido:\n\n${cartItems}\n\nSubtotal: $${subtotalCart}\n\n¡Gracias!`;

    // Codificar el mensaje para usarlo en una URL
    return encodeURIComponent(message);
  }
</script>

<button disabled={$cart.length === 0}
  class="btn btn-primary mt-5 w-100"
  on:click={() => {
    const message = generateWhatsAppMessage();
    const phoneNumber = "+573213872648";
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  }}
>
  Enviar pedido por WhatsApp
</button>
