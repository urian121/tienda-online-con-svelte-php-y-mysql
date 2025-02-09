<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Asegúrate de importar Bootstrap JS
  import "./css/global.css";

  import Footer from "./components/Footer.svelte";
  import ProductsApi from "./components/ProductsApi.svelte";
  import Cart from "./components/Cart.svelte";

  import OffcanvasHeader from "./components/OffcanvasHeader.svelte";
  import ListProductsCart from "./components/ListProductsCart.svelte";
  import SubTotalCart from "./components/SubTotalCart.svelte";
  import ApiWhatApp from "./components/ApiWhatApp.svelte";
</script>

<Cart />

<!-- Contenido principal -->
<div class="container my-5">
  <h1 class="text-center fw-bold">
    Bienvenidos a <span style="color: #333;">CaféExpress</span> - Tienda Online de Café ☕
  </h1>
  <div class="row g-4 mt-4">
    <ProductsApi />
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
