<script>
  /*
   * IMPORTANTE: En este componente, necesitamos importar el subtotal del store cartStore.
   * subtotal es un store derivado que calcula el total de la compra.
   * En Svelte, cuando importas un writable o derived, necesitas usar el signo $ delante del nombre para extraer su valor.
   * Con $subtotal, Svelte automáticamente se suscribirá al store y actualizará el valor cuando cambie el carrito.
   */

  import { subtotal } from "../stores/subtotalStore";
</script>

<h5 class="justify-content-between mb-2">
  <span class="fw-bold px-3">SUBTOTAL:</span>
  <span id="subtotal" class="fw-bold float-end px-2 fs-2"> ${$subtotal}</span>
</h5>
