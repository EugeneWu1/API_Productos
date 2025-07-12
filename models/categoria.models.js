import pool from '../config/database.js'

export const getAllCategorias = async () => {
    const query  = `SELECT
                    c.id,
                    c.nombre 
                    FROM categorias c
                    ORDER BY c.id ASC
    `

    const [data] = await pool.query(query)
    return data

}

export const getCategoriaId = async (id) => {
    const query = `SELECT
                    c.id,
                    c.nombre
                    FROM categorias c
                    where c.id = ?
                    ORDER BY id ASC
    `
    try {
        const [data] = await pool.query(query,[id])
        return data
    } catch (error) {
        console.error(`Error al obtener producto con ${id}:`, error)
        throw error
    }
}

export const createCategoria = async (categoria) => {
    const conn = await pool.getConnection()

    try {
        const {nombre} = categoria

        await conn.beginTransaction()
        const query = `INSERT INTO categorias (nombre) values (?)`
        const [data] = await conn.execute(query,[nombre])

        await conn.commit()

        categoria.id= data.insertId
        
        return {
            id: data.insertId,
            nombre
        }
    } catch (error) {
        await conn.rollback()
        throw error
    }finally{
        conn.release()
    }
}

export const updateCategoria = async (id,data) => {
    const conn = await pool.getConnection()

    try {
        await conn.beginTransaction()
        const { nombre } = data
        const query = `UPDATE categorias set nombre = ? where id= ?`
        const [resultado] = await conn.execute(query,[nombre,id])

        conn.commit()

        const nuevaData = {
            id,
            nombre
        }

        await conn.commit()

        return nuevaData

    } catch (error) {
        await conn.rollback()
        console.error('Error al actualizar categoria:', error)
    }finally{
        conn.release()
    }
}

export const deleteCategoria = async (id) => {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        const query = `DELETE FROM  categorias WHERE id = ?`
        const [resultado]  =  await conn.execute(query,[id])
        await conn.commit()
        return  resultado
    } catch (error) {
        await conn.rollback()
        console.error('Error al eliminar categoria:', error)
        throw error
    }finally{
        conn.release()
    }
}