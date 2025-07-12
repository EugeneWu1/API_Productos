import { validateCategoria, categoriaSchemaUpdate} from '../schemas/categorias.schema.js'
import {getAllCategorias, getCategoriaId, createCategoria,updateCategoria,deleteCategoria} from '../models/categoria.models.js'

export const getAll = async (req,res) => {
    try {
        const categoriadb = await getAllCategorias()
        res.json(categoriadb)
    } catch (error) {
        res.status(400).json({
            message: 'Error al cargar categorias' + error.message
        })
    }
}

export const getCategoriaById = async (req,res) => {
    const {  id  } = req.params

    const parseId = Number(id)

    if(isNaN(parseId)){
        return res.status(400).json({
            message:'El ID debe ser numero.'
        })
    }

    try {
        const categoriadb = await getCategoriaId(parseId)
        if(!categoriadb || categoriadb.length === 0){
            return res.status(404).json({
                message: 'Categoria no encontrada.'
            })
        }

        res.json(categoriadb)
    } catch (error) {
        res.status(400).json({
         message: 'Error al cargar categorias' + error.message
      })
    }
}

export const crearCategoria = async (req,res) => {
    const categoria = req.body

    const { success,error, data: safeData } = validateCategoria(categoria)

    if(!success){
        return res.status(400).json(error)
    }

    try {
        const nuevaCategoria = await createCategoria(safeData)
        res.status(201).json(nuevaCategoria)
    } catch (error) {
        res.status(400).json({
            message: 'No se pudo guardar correctamente' + error.message
        })
    }

}

export const actualizarCategoria = async (req,res) => {
    const {id} = req.params

    const parseId = Number(id)

    if(isNaN(parseId)){
        return res.status(400).json({
            message:'El ID debe ser numero.'
        })
    }

    const parse = categoriaSchemaUpdate.safeParse(req.body)

    if(!parse.success){
        return res.status(400).json({
            message: 'Error de validaciones',
            errors: parsed.error.format()
        })
    }

    const data = parse.data

    try {
        const categoriaActualizada = await updateCategoria(parseId,data)
        if(!categoriaActualizada){
            return res.status(404).json({
            message: 'Categoria no encontrada'
         })
        }

        res.status(200).json({
            message: 'Producto actualizado exitosamente'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error interno al actualizar producto'
        })
    }
    
}

export const borrarCategoria = async (req,res) => {
    const {id} = req.params
   const parseId = Number(id)

   if(isNaN(parseId)){
      return res.status(400).json({
         message: 'El ID debe ser un numero'
      })
   }

   try {
    const eliminado = await deleteCategoria(parseId)

    if(eliminado.affectedRows === 0){
        return res.status(404).json({
            message: 'Categoria no encontrada'
         })
    }

    res.status(200).json({
         message: 'La categoria se ha eliminado exitosamente'
      })

   } catch (error) {
        res.status(500).json({
            message: 'Error interno al eliminar producto'
        })
   }

}
