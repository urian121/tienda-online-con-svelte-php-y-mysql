-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-02-2025 a las 21:29:40
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
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `name`, `price`, `image`, `category`) VALUES
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
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
