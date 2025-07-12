import productos from '../local_db/productos.json' with {type:'json'}
import { productoSchemaUpdate, validarProductos } from '../schemas/productos.schemas.js'
import {getAllProductos, getProductoById,getProductosDisponibles, insertProducto, updateProducto,deleteProducto} from '../models/productos.model.js'
import { v4 as uuidv4 } from 'uuid';


export const getAll = async (req,res) =>{
   try {
      const productosdb = await getAllProductos()

      res.json(productosdb)
   } catch (error) {
      res.status(400).json({
         message: 'Error al cargar productos' + error.message
      })
   }
}

export const mostrarDisponibles = async (req,res) => {
   try {
      const productosdb = await getProductosDisponibles()

      res.json(productosdb)
   } catch (error) {
      res.status(400).json({
         message: 'Error al cargar productos' + error.message
      })
   }
}

export const busquedaPorID = async (req,res) => {
    const { id } = req.params
   
   const parseId = Number(id)

   if(isNaN(parseId)){
      return res.status(400).json({
         message: 'El id debe ser un numero'
      })
   }

   try {
      const productodb = await getProductoById(parseId)

      if (!productodb || productodb.length === 0) {
         return res.status(404).json({
            message: 'Producto no encontrado'
         })
      }
      res.json(productodb)
   } catch (error) {
      res.status(400).json({
         message: 'Error al cargar productos' + error.message
      })
   }
   
}

export const crearProductos = async (req, res) => {
  const producto = req.body

  const {success, error, data: safeData} = validarProductos(producto)

  if (!success) {
    return res.status(400).json(error)
  }

  const id = uuidv4()
  safeData.id = id

  try {
   const nuevoProducto = await insertProducto(safeData)
  
  res.status(201).json(nuevoProducto)
  } catch (error) {
   res.status(400).json({
      message: 'No se pudo guardar correctamente' + error.message
   })
  }
}

export const modificarProducto = async (req,res) => {
    const {id} = req.params
   const parseId = Number(id)

   if(isNaN(parseId)){
      return res.status(400).json({
         message: 'El id debe ser un numero'
      })
   }

   const parsed = productoSchemaUpdate.safeParse(req.body)

   if(!parsed.success){
      return res.status(400).json({
         message: 'Error de validaciones',
         errors: parsed.error.format()
      })
   }

   const data = parsed.data

   try {
      const productoActualizado = await updateProducto(parseId,data)

      if(!productoActualizado){
         return res.status(404).json({
            message: 'Producto no encontrado'
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

export const eliminarProducto = async (req,res) => {
   const {id} = req.params
   const parseId = Number(id)

   if(isNaN(parseId)){
      return res.status(400).json({
         message: 'El id debe ser un numero'
      })
   }

   try {
      const eliminado = await deleteProducto(parseId)


      if (eliminado.affectedRows === 0) {
         return res.status(404).json({
            message: 'Producto no encontrado'
         })
      }

      res.status(200).json({
         message: 'El producto se ha eliminado exitosamente'
      })
   } catch (error) {
      res.status(500).json({
         message: 'Error interno al eliminar producto'
      })
   }
}



