
import pool from '../config/database.js'

export const getAllProductos = async () => {
    const query = `SELECT
                p.id,
                p.nombre,
                p.precio,
                p.descripcion,
                p.disponible,
                p.fecha_ingreso,
                p.categoria_id,
                c.nombre as nombre_categoria
                from productos p
                LEFT JOIN categorias c ON p.categoria_id = c.id
                `

    const [resultados] = await pool.query(query)

    return resultados
}

export const getProductosDisponibles = async() =>  {
    const query = `
                SELECT
                p.id,
                p.nombre,
                p.precio,
                p.descripcion,
                p.disponible,
                p.fecha_ingreso,
                p.categoria_id,
                c.nombre AS nombre_categoria
                FROM productos p
                LEFT JOIN categorias c ON p.categoria_id = c.id
                WHERE p.disponible = true
                GROUP BY p.id
  `;
    try {
        const [resultados] = await pool.query(query)
        return resultados
    } catch (error) {
        console.error('Error al obtener producto disponible:', error)
        throw error
    }
}

export const getProductoById = async (id) =>{
const query = `SELECT
                p.id,
                p.nombre,
                p.precio,
                p.descripcion,
                p.disponible,
                p.fecha_ingreso,
                p.categoria_id,
                c.nombre as nombre_categoria
                from productos p
                LEFT JOIN categorias c ON p.categoria_id = c.id
                WHERE p.id = ?;
                `
    
    try {
        const [resultados] = await pool.query(query,[id])
        return resultados
    } catch (error) {
        console.error(`Error al obtener producto con ${id}:`, error)
        throw error
    }
}

export const insertProducto = async (producto) => {
    const conn = await pool.getConnection()
    try {
        conn.beginTransaction()

        const {nombre,precio,descripcion,disponible,categoria_id} = producto

        const query = `INSERT INTO productos
                        (nombre,precio,descripcion,disponible,categoria_id)
                        values (?,?,?,?,?)                
        `

        const [resultado] = await conn.execute(query,[nombre,precio,descripcion,disponible,categoria_id])

        conn.commit()
        producto.id = resultado.insertId
        return producto

    } catch (error) {
        conn.rollback()
        throw error
    }finally{
        conn.release()
    }
}

export const updateProducto = async (id,data) => {
    const conn = await pool.getConnection()
  try {
    conn.beginTransaction()

    const { nombre, precio, descripcion, disponible, categoria_id } = data

    const query = `
      UPDATE productos
      SET nombre = ?, 
        precio = ?, 
        descripcion = ?, 
        disponible = ?, 
        categoria_id = ?
        WHERE id = ?
    `

    const [resultado] = await conn.execute(query, [
      nombre,
      precio,
      descripcion,
      disponible,
      categoria_id,
      id
    ])

    conn.commit()

    const nuevaData = {
      id,
      nombre,
      precio,
      descripcion,
      disponible,
      categoria_id
    }
    return nuevaData

  } catch (error) {
    conn.rollback()
    console.error('Error al actualizar producto:', error)
    throw error
  } finally {
    conn.release()
  }
}

export const deleteProducto = async (id) => {
    const conn = await pool.getConnection()
    try {
        conn.beginTransaction()

        const query = `DELETE FROM productos WHERE productos.id = ?`

        const [resultado] = await conn.execute(query,[id])

        conn.commit()

        return resultado

    } catch (error) {
        conn.rollback()
        console.error('Error al eliminar producto:', error)
        throw error
    }finally{
        conn.release()
    }
}