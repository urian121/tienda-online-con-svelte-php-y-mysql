<script>
  import { onMount } from "svelte";
  import { addToCart } from "../stores/addToCartStore";
  import { getProducts, cafes  } from "../stores/getProductsStore";

  // Obtiene los productos del backend al cargar el componente
  onMount(() => {
    getProducts();
  });

  function handleAddToCart(cafe) {
    addToCart(cafe);
  }
</script>

<!-- Usamos $cafes para acceder al store -->
{#each $cafes as cafe}  
  <div class="col-md-3">
    <div class="card h-100 border-0 custom-card d-flex flex-column">
      <img src={`/fotos-cafe/${cafe.image}.jpg`} class="card-img-top" alt="{cafe.name}" />
      <div class="card-body d-flex flex-column flex-grow-1">
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
