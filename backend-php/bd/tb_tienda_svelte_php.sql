-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-02-2025 a las 22:06:39
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tb_tienda_svelte_php`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_carrito`
--

CREATE TABLE `tbl_carrito` (
  `id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `agregado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_carrito`
--

INSERT INTO `tbl_carrito` (`id`, `producto_id`, `cantidad`, `agregado_en`) VALUES
(1, 3, 1, '2025-02-07 21:51:59'),
(2, 1, 1, '2025-02-07 21:52:16'),
(3, 3, 1, '2025-02-07 21:54:36'),
(4, 3, 1, '2025-02-07 22:01:20'),
(5, 2, 1, '2025-02-07 22:01:22'),
(6, 2, 1, '2025-02-07 22:01:23'),
(7, 1, 1, '2025-02-07 22:01:24'),
(8, 1, 1, '2025-02-07 22:01:24'),
(9, 2, 1, '2025-02-07 22:01:27'),
(10, 3, 1, '2025-02-07 22:02:57'),
(11, 2, 1, '2025-02-07 22:02:59'),
(12, 2, 1, '2025-02-07 22:03:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_products`
--

CREATE TABLE `tbl_products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `name`, `price`, `image`, `category`) VALUES
(1, 'Café Caramel con Chocolate', 59.90, 'cafe_01', 'cafe'),
(2, 'Café Frio con Chocolate Grande', 49.90, 'cafe_02', 'cafe'),
(3, 'Latte Frio con Chocolate Grande', 54.90, 'cafe_03', 'cafe'),
(4, 'Latte Frio con Chocolate Pequeño', 54.90, 'cafe_04', 'cafe'),
(5, 'Malteada Fria con Chocolate Grande', 54.90, 'cafe_05', 'cafe'),
(6, 'Café Mocha Caliente Chico', 39.90, 'cafe_06', 'cafe'),
(7, 'Café Mocha Caliente Grande con Chocolate', 29.90, 'cafe_07', 'cafe'),
(8, 'Café Caliente Capuchino Grande', 59.90, 'cafe_08', 'cafe'),
(9, 'Café Mocha Caliente Mediano', 49.90, 'cafe_09', 'cafe'),
(10, 'Café Mocha Frio con Caramelo Mediano', 49.90, 'cafe_10', 'cafe'),
(11, 'Café Mocha Frio con Chocolate Mediano', 49.90, 'cafe_11', 'cafe'),
(12, 'Café Espresso', 29.90, 'cafe_12', 'cafe'),
(13, 'Café Capuchino Grande con Caramelo', 15.90, 'cafe_13', 'cafe'),
(14, 'Café Caramelo Grande', 19.10, 'cafe_14', 'cafe'),
(15, 'Café Pilón', 42.30, 'cafe_15', 'cafe'),
(16, 'Café Cubita', 62.20, 'cafe_16', 'cafe');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_carrito`
--
ALTER TABLE `tbl_carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_carrito`
--
ALTER TABLE `tbl_carrito`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_carrito`
--
ALTER TABLE `tbl_carrito`
  ADD CONSTRAINT `tbl_carrito_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
