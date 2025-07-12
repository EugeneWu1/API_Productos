import { Router } from 'express'
import {getAll,mostrarDisponibles,busquedaPorID,
    crearProductos,modificarProducto, eliminarProducto
} from '../controllers/productos.controllers.js'
import { isAuth } from '../middlewares/isAuth.js'

const productosRouter = Router()


productosRouter.get('/', isAuth, getAll)

productosRouter.post('/', crearProductos)

productosRouter.get('/disponibles', mostrarDisponibles)

productosRouter.get('/:id', busquedaPorID)

productosRouter.put('/:id', modificarProducto)

productosRouter.delete('/:id', eliminarProducto)

export default productosRouter