# API Endpoints - Tienda Online

Este documento describe los endpoints disponibles en la API del backend de la tienda online.

## Base URL

```
http://localhost/tienda-online-con-svelte-php-y-mysql/backend-php/index.php
```


## 1. Obtener productos

**URL:**  
```
GET ?action=getProducts
```

**Descripción:**  
Obtiene la lista de todos los productos disponibles en la tienda.

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Producto A",
      "price": 100.0,
      "stock": 10
    }
  ]
}
```


## 2. Agregar producto al carrito

**URL:**  
```
POST ?action=addToCart
```

**Descripción:**  
Agrega un producto al carrito de compras.

**Cuerpo de la solicitud (JSON):**
```json
{
  "id": 1,
  "quantity": 2
}
```

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "message": "Producto agregado al carrito"
}
```


## 3. Obtener productos del carrito

**URL:**  
```
GET ?action=getProductsCart
```

**Descripción:**  
Obtiene la lista de productos que están en el carrito de compras.

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "cart": [
    {
      "id": 1,
      "name": "Producto A",
      "price": 100.0,
      "quantity": 2
    }
  ]
}
```

## 4. Eliminar producto del carrito

**URL:**  
```
DELETE ?action=removeProductCart
```

**Descripción:**  
Elimina un producto del carrito.

**Cuerpo de la solicitud (JSON):**
```json
{
  "id": 1
}
```

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "message": "Producto eliminado del carrito"
}
```


## Notas
- La API responde con `success: false` si ocurre algún error en las solicitudes.
- Asegúrate de enviar las solicitudes `POST` y `DELETE` con el encabezado `Content-Type: application/json`.
- Los datos en los ejemplos pueden variar según la base de datos utilizada.

