/**
 * Muestra u oculta el offcanvas del carrito
 * @param {boolean} show
 */
export function toggleOffcanvas(show) {
  const offcanvas = document.querySelector(".offcanvas");
  // Añadir transiciones para el efecto visual de apertura/cierre
  offcanvas.classList.add("transition");

  // Mostrar el carrito si 'show' es true, ocultarlo si es false
  if (show) {
    offcanvas.classList.add("show");
  } else {
    offcanvas.classList.remove("show");
    offcanvas.classList.add("hiding");
    setTimeout(() => offcanvas.classList.remove("hiding"), 600);
  }
}
