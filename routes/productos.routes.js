import { Router } from 'express'
import productosController from '../controllers/productos.controllers.js'

const productosRouter = Router()

productosRouter.get('/',(req,res) => {
    productosController.getAll(req,res)
})

productosRouter.get('/productos',productosController.mostrarProductos)

productosRouter.get('/disponibles',productosController.mostrarDisponibles)

productosRouter.get('/:id',productosController.busquedaPorID)

productosRouter.post('/',productosController.crearProductos)

productosRouter.put('/:id',productosController.modificarProducto)

productosRouter.delete('/:id',productosController.eliminarProducto)

export default productosRouter