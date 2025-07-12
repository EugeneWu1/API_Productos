import zod from 'zod'

export const categoriaSchema =zod.object({
    "nombre": zod.string().min(4).max(100)
})

export const validarCategoria = (categoria) => {
    return  categoriaSchema.safeParse(categoria)
}