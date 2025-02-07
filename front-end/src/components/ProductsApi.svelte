<script>
  import { onMount } from "svelte";
  import { addToCart, getProducts, cafes } from "../stores/cartStore";

  onMount(() => {
    getProducts();
  });

  function handleAddToCart(cafe) {
    addToCart(cafe);
  }
</script>

{#each $cafes as cafe}  <!-- 🔹 Usamos $cafes para acceder al store -->
  <div class="col-md-3">
    <div class="card h-100 border-0 custom-card">
      <img src={`/fotos-cafe/${cafe.image}.jpg`} class="card-img-top" alt="{cafe.name}" />
      <div class="card-body">
        <h5 class="card-title">{cafe.name}</h5>
        <p class="card-text">Categoría: <strong>{cafe.category}</strong></p>
        <p class="card-text">Precio: <strong class="price">${cafe.price}</strong></p>

        <button class="btn btn-cart w-100 mt-auto" on:click={() => handleAddToCart(cafe)}>
          Agregar al carrito &nbsp; <i class="bi bi-cart-plus"></i>
        </button>
      </div>
    </div>
  </div>
{/each}
