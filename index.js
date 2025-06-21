import express from 'express'
import productosRouter from './routes/productos.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

//Rutas de productos
app.use('/productos',productosRouter)

//Ruta predeterminada
app.use((req,res)=>{
   return res.status(404).json({
      message: `${req.url} no encontrada`
   })
})

app.listen(PORT, () => {
   console.log(`El servidor se esta ejecutando en el puerto http://localhost:${PORT}`)
})