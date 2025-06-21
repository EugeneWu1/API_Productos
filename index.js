import express from 'express'
import productos from './local_db/productos.json' with { type: 'json'}

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

//? Ruta inicial
app.get('/', (req, res) => {
   res.send('Bienvenido a la API de Productos')
})

//? Ruta que retorna un listado con todos los productos
app.get('/productos', (req,res) => {
   res.json(productos)
})

//? Ruta que devuelve únicamente los productos que están marcados como disponibles
app.get('/productos/disponibles', (req,res) => {

   const Disponibles = productos.filter( (producto)=> producto.disponible === true)
   return res.status(200).json({
      Disponibles
   })
})

//? Ruta que retorna la información del producto con el ID especificado
app.get('/productos/:id', (req,res) => {
   const { id } = req.params
   
   const parseId = Number(id)

   if(isNaN(parseId)){
      return res.status(400).json({
         message: 'El id debe ser un numero'
      })
   }

   const producto = productos.find( ({ id }) => id === parseId)

        if (!producto) {
            return res.status(404).json({
                message: 'El producto no existe'
            })
        }

        res.json(producto)
})

//? Ruta que permite agregar un nuevo producto
app.post('/productos', (req,res) => {
   const { nombre,precio,descripcion,disponible} = req.body

   //!Validacion: el nombre no puede ir vacio
   if( !nombre || nombre.trim() === ''){
      return res.status(400).json({
         message: 'El nombre del producto es obligatorio'
      })
   }

   //!Validacion: el precio debe ser un numero mayor que cero
   if(typeof precio !== 'number' || precio <= 0){
      return res.status(400).json({
         message: 'El precio debe ser un numero positivo mayor a cero'
      })
   }

   //!Validacion: La descripcion debe ser mayor a 10 caracteres
   if(!descripcion || descripcion.trim().length < 10){
      return res.status(400).json({
         message: 'La descripcion debe tener al menos 10 caracteres'
      })
   }

   //!Validacion: El campo disponible debe ser un booleano
   if(typeof disponible !== 'boolean'){
      return res.status(400).json({
         message: 'El campo disponible debe ser true o false'
      })
   }

   const nuevoID = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1

   const nuevoProducto = {
      id : nuevoID,
      nombre : nombre.trim(),
      precio,
      descripcion: descripcion.trim(),
      disponible,
      fechaIngreso: new Date().toISOString()
   }   

   productos.push(nuevoProducto)

   res.status(201).json(nuevoProducto)

})

//? Ruta que permite modificar los datos de un producto existente.
app.put('/productos/:id', (req,res) => {
   const {id} = req.params
   const parseId = Number(id)

   if(isNaN(parseId)){
      return res.status(400).json({
         message: 'El id debe ser un numero'
      })
   }

   const data = req.body
   const dataValida = {}

   const index = productos.findIndex( (producto) => producto.id == parseId )

   if(index === -1){
      return res.status(404).json({
         message: 'El producto no existe'
      })
   }

   if(typeof data.nombre !== 'string' || data.nombre.trim() === ''){
      return res.status(400).json({
         message: 'El nombre no es valido'
      })
   }else{
      dataValida.nombre = data.nombre.trim()
   }

   if(typeof data.precio !== 'number' || data.precio <= 0){
      return res.status(400).json({
         message: 'El precio debe ser un numero positivo mayor a cero'
      })
   }else{
      dataValida.precio = data.precio
   }

   if (typeof data.descripcion !== 'string' || data.descripcion.trim().length < 10) {
    return res.status(400).json({ message: 'La descripción debe tener al menos 10 caracteres' })
  } else {
    dataValida.descripcion = data.descripcion.trim()
  }

   if (typeof data.disponible !== 'boolean') {
    return res.status(400).json({ message: 'El campo disponible debe ser true o false' })
  } else {
    dataValida.disponible = data.disponible
  }

   productos[index] = {...productos[index], ...dataValida}


   res.status(200).json({
      message: 'Producto actualizado exitosamente'
   })

})

//? Ruta que elimina un producto con base en su ID.
app.delete('/productos/:id', (req,res) => {
   const {id} = req.params
   const parseId = Number(id)

   if(isNaN(parseId)){
      return res.status(400).json({
         message: 'El id debe ser un numero'
      })
   }

   const index = productos.findIndex( (producto)=> producto.id == parseId )

   if(index === -1){
      return res.status(404).json({
         message: 'El producto no existe'
      })
   }

   productos.splice(index,1)

   res.status(200).json({
      message: 'El producto se ha eliminado exitosamente'
   })
})


app.listen(PORT, () => {
   console.log(`El servidor se esta ejecutando en el puerto http://localhost:${PORT}`)
})