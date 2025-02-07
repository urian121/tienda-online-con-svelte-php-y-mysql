<script>
  import { onMount } from "svelte";
  import { addToCart } from "../stores/cartStore"; // Importamos la función para agregar al carrito
  let cafes = [];

  // Cargar los datos al montar el componente
  onMount(async () => {
    const response = await fetch("/data/data.json");
    cafes = await response.json();
    //console.log(cafes);
  });

  // Función para agregar al carrito
  function handleAddToCart(cafe) {
    addToCart(cafe);
  }
</script>

{#each cafes as cafe}
  <div class="col-md-3">
    <div class="card h-100 border-0 custom-card">
      <img
        src={`/fotos-cafe/${cafe.image}.jpg`}
        class="card-img-top"
        alt="Paquete de 3 donas Glaseadas"
      />
      <div class="card-body">
        <h5 class="card-title">{cafe.name}</h5>
        <p class="card-text">Categoría: <strong>{cafe.category}</strong></p>
        <p class="card-text">
          Precio: <strong class="price">${cafe.price}</strong>
        </p>

        <button
          class="btn btn-cart w-100 mt-auto"
          on:click={() => handleAddToCart(cafe)}
        >
          Agregar al carrito &nbsp; <i class="bi bi-cart-plus"></i>
        </button>
      </div>
    </div>
  </div>
{/each}
