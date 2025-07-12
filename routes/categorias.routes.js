import { Router } from 'express'
import categoriasController from '../controllers/productos.controllers.js'
import { isAuth } from '../middlewares/isAuth.js'

const categoriasRouter = Router()

categoriasRouter.get('/',(req,res) => {
    categoriasController.getAll(req,res)
})

//Crear categoria
categoriasRouter.post('/',categoriasController.crearCategoria)

//Consulta por id
categoriasRouter.get('/:id',categoriasController.getById)

//Actualizar por id
categoriasRouter.put('/:id',categoriasController.updateCategoria)

//Eliminar categoria
categoriasRouter.delete('/:id',categoriasController.deleteCategoria)

export default categoriasRouter