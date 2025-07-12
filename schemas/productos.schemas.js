import zod from 'zod'

const productoSchema = zod.object({
    "nombre":zod.string().min(3).max(100),
    "precio":zod.number(),
    "descripcion":zod.string().min(10).max(100),
    "disponible":zod.boolean(),
    "categoria_id":zod.number().optional()
}).strict()

//Schema solo para actualizar producto y afectar campos opcionales
export const productoSchemaUpdate = productoSchema.partial()

export const validarProductos = (producto) => {
    return  productoSchema.safeParse(producto)
}