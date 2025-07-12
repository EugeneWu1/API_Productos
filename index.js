import express from 'express'
import productosRouter from './routes/productos.routes.js'
import categoriasRouter from './routes/categorias.routes.js'
import cors from 'cors' 
import dotenv from 'dotenv'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(cors({
    // configuración de los origenes permitidos
    origin: [
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'https://prod.server.com',
        'https://test.server.com'
    ],
    // metodos permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // encabezados permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'Bearer', 'api-key']
}))

//Rutas de productos
app.use('/productos',productosRouter)

//Rutas de categorias
app.use('/categorias',categoriasRouter)

//Ruta predeterminada
app.use((req,res)=>{
   return res.status(404).json({
      message: `${req.url} no encontrada`
   })
})

app.listen(PORT, () => {
   console.log(`El servidor se esta ejecutando en el puerto http://localhost:${PORT}`)
})