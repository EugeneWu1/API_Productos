# 📦 API de Productos

Una API REST construida con Node.js y Express para gestionar el catálogo de productos de una tienda que vende útiles escolares.

## 📁 Requisitos

- VisualStudio Code
- Node.js (v16 o superior)
- git
- Postman
- Docker desktop
- Mysql Workbench (o Navicat para MySql)

Extensiones de VisualStudio Code alternativas a Postman:
- REST Client
- Thunder Client

## ⚙️ Clona el repositorio
1. Utilizando git Bash en la carpeta donde quieras guardar la API:

```` bash
 git clone https://github.com/EugeneWu1/API_Productos.git
 ````

2. Abre docker desktop
Desde la raíz de la carpeta mysql-docker se encuentra el archivo docker-compose.yml, ejecuta:
````bash
  docker compose up -d
````

## ⚙️ Instalación de dependencias

- Instala express ejecutando el siguiente comando en la terminal:

```bash

 npm install express
```

````bash
 npm install zod uuid jsonwebtoken cors dotenv mysql2
````

## 🚀 Ejecución

En la terminal de VisualStudio Code ejecuta el comando:

* npm run dev

## 📚 Pruebas las rutas

Después de haber ejecutado el comando anterior dirigete al archivo "api.http" y ejecuta las rutas disponibles.

Todas las rutas están montadas bajo el prefijo /productos

-GET /productos: Muestra todos los productos registrados.

-GET /productos/disponibles: Lista solo los productos disponibles (disponible: true)

-GET /productos/:id: Devuelve un producto por su id.

-POST /productos: Crea un nuevo producto.
Requerimientos del body para crear un nuevo producto usa este formato de ejemplo:

{
  "nombre": "Laptop VICTUS",
  "precio": 799.99,
  "descripcion": "Laptop moderna con 16GB RAM y 256GB SSD",
  "disponible": true,
  "categoria_id": 1
}

-PUT /productos/:id :Modifica un producto existente por su id.
 Requiere los mismos campos que POST.

-DELETE /productos/:id : Elimina un producto por su id.



Todas las rutas están montadas bajo el prefijo /categorias

-GET /categorias: Muestra todos las categorias registrados.

-GET /categorias/:id: Devuelve una categoria por su id.

-POST /categorias: Crea una nueva categoria.
Requerimientos del body para crear un nuevo producto usa este formato de ejemplo:

{
  "nombre": "Jardineria "
}

-PUT /categorias/:id :Modifica una categoria existente por su id.
 Requiere los mismos campos que POST.

-DELETE /categorias/:id : Elimina una categoria por su id.