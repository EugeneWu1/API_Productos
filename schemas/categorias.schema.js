import zod from 'zod'

export const categoriaSchema =zod.object({
    "nombre": zod.string().min(4).max(100)
}).strict()

export const categoriaSchemaUpdate = categoriaSchema.partial()

export const validateCategoria = (categoria) => {
    return  categoriaSchema.safeParse(categoria)
}