import { Router } from 'express'
import {getAll, crearCategoria,getCategoriaById,actualizarCategoria,borrarCategoria} from '../controllers/categorias.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const categoriasRouter = Router()

//Consultar todas las categorias
categoriasRouter.get('/', isAuth,getAll)

//Crear categoria
categoriasRouter.post('/',crearCategoria)

//Consulta por id
categoriasRouter.get('/:id',getCategoriaById)

//Actualizar por id
categoriasRouter.put('/:id',actualizarCategoria)

//Eliminar categoria
categoriasRouter.delete('/:id',borrarCategoria)

export default categoriasRouter