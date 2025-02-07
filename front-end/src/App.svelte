<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Asegúrate de importar Bootstrap JS
  import "./css/global.css";

  import Footer from "./lib/Footer.svelte";
  import Api from "./lib/Api.svelte";
  import Cart from "./lib/Cart.svelte";

  import OffcanvasHeader from "./lib/OffcanvasHeader.svelte";
  import ListProductsCart from "./lib/ListProductsCart.svelte";
  import SubTotalCart from "./lib/SubTotalCart.svelte";
  import ApiWhatApp from "./lib/ApiWhatApp.svelte";

  // Mostrar el carrito en la consola
  // $: console.log($cart);
</script>

<Cart />

<!-- Contenido principal -->
<div class="container my-5">
  <h1 class="text-center fw-bold">
    Bienvenidos a Tu Tienda de Café <i class="bi bi-cup-straw"></i>
  </h1>
  <div class="row g-4 mt-4">
    <Api />
  </div>
</div>

<!-- Offcanvas del carrito -->
<div
  class="offcanvas offcanvas-end"
  tabindex="-1"
  id="offcanvasRight"
  aria-labelledby="offcanvasRightLabel"
>
  <OffcanvasHeader />

  <div class="offcanvas-body border-bottom">
    <ListProductsCart />
  </div>

  <div class="offcanvas-footer mt-4">
    <SubTotalCart />
    <div class="text-center mb-5 px-3">
      <ApiWhatApp />
    </div>
  </div>
</div>

<Footer />
