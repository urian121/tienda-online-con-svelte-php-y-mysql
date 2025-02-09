<script>
  import { cart, getProductsCart } from "../stores/cartStore";
  import { removeProductCart } from "../stores/removeProductCartStore";
  import { onMount } from "svelte";

  // Obtiene los productos del carrito al cargar el componente
  onMount(() => {
    getProductsCart();
    console.log("Productos en el carrito:", $cart);
  });
</script>

<div class="container mb-3">
  {#if $cart.length > 0}
    {#each $cart as item}
      <div class="row align-items-center border-bottom py-2">
        <div class="col-3">
          <img
            class="img-fluid rounded"
            src="./fotos-cafe/{item.image}.jpg"
            alt={item.name}
          />
        </div>
        <div class="col-6">
          <h6 class="mb-1 title-product">{item.name}</h6>
          <p class="mb-0 detalles-product badge text-bg-info">{item.category}</p>
        </div>

        <div class="col-3 text-end">
          <span class="fw-bold"
            ><span class="fs-6 color-gris">{item.cantidad}x</span><span
              class="fs-5 precio">${item.price}</span
            ></span
          >
          <button
            class="btn btn-danger mt-2 btn-borrar"
            aria-label="Borrar"
            on:click={() => removeProductCart(item.id)}
            ><i class="bi bi-trash3"></i></button
          >
        </div>
      </div>
    {/each}
  {:else}
    <p class="text-center">No hay productos en el carrito.</p>
  {/if}
</div>
