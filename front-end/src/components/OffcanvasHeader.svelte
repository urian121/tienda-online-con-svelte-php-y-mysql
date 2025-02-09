<script>
  import { toggleOffcanvas } from "../stores/offcanvasStore";

  // Función para cerrar el offcanvas
  function closeOffcanvas() {
    const offcanvasElement = document.getElementById("offcanvasRight");
    offcanvasElement.classList.remove("show");

    // Mostrar el carrito si 'show' es true, ocultarlo si es false
    toggleOffcanvas(false);
  }
</script>

<div class="offcanvas-header border-bottom">
  <h4 class="offcanvas-title text-center">Carrito de compras</h4>
  <button
    type="button"
    class="btn-close"
    data-bs-dismiss="offcanvas"
    aria-label="Close"
    on:click={closeOffcanvas}
  ></button>
</div>
