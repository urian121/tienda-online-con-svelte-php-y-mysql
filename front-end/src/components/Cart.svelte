<script>
  import { cart } from "../stores/cartStore";
  import { toggleOffcanvas } from "../stores/offcanvasStore";

  function mostrarOcultarOffcanvas() {
    const offcanvasElement = document.getElementById("offcanvasRight");
    const btn_shopping = document.querySelector(".btn_shopping");

    // Toggle para mostrar/ocultar el offcanvas
    let show = offcanvasElement.classList.toggle("show");
    if (!show) {
      // Ocultar el offcanvas
      toggleOffcanvas(false);
    }

    // Añadir la clase de animación al botón
    btn_shopping.classList.add("balanceo");

    // Eliminar el efecto de balanceo después de 500ms
    setTimeout(() => {
      btn_shopping.classList.remove("balanceo");
    }, 500);
  }
</script>

<!-- Botón del carrito -->
<div class="position-relative">
  <a
    href="!#"
    class="btn btn_shopping cart-badge position-fixed top-0 end-0 me-4 mt-3 swing-on-hover border bg-white"
    aria-label="Carrito de compras"
    on:click={mostrarOcultarOffcanvas}
  >
    <i class="bi bi-bag-heart"></i>
    <span
      id="contador-carrito"
      class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger"
    >
      {$cart.length}
    </span>
  </a>
</div>
