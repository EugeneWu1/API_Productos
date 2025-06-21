# 📦 API de Productos

Una API REST construida con Node.js y Express para gestionar el catálogo de productos de una tienda que vende útiles escolares.

## 📁 Requisitos

-VisualStudio Code
-Node.js (v16 o superior)
-git
-Postman

Extensiones de VisualStudio Code alternativas a Postman:
-REST Client
-Thunder Client

### ⚙️ Clona el repositorio
Utilizando git Bash en la carpeta donde quieras guardar la API:

* git clone https://github.com/EugeneWu1/API_Productos.git

#### ⚙️ Instalación de dependencias

-Instala express ejecutando el siguiente comando en la terminal:

* npm install express

##### 🚀 Ejecución

En la terminal de VisualStudio Code ejecuta el comando:

npm run dev

###### 📚 Pruebas las rutas

Después de haber ejecutado el comando anterior dirigete al archivo "api.http" y ejecuta las rutas disponibles.

Todas las rutas están montadas bajo el prefijo /productos

-GET /productos: Muestra todos los productos registrados.

-GET /productos/disponibles: Lista solo los productos disponibles (disponible: true)

-GET /productos/:id: Devuelve un producto por su id.

-POST /productos: Crea un nuevo producto.
Requerimientos del body para crear un nuevo producto usa este formato de ejemplo:

{
  "nombre": "Producto A",
  "precio": 25.5,
  "descripcion": "Descripción detallada del producto.",
  "disponible": true
}

-PUT /productos/:id :Modifica un producto existente por su id.
Requiere los mismos campos que POST.

-DELETE /productos/:id : Elimina un producto por su id.