import jwt from 'jsonwebtoken' 

export const login = (req, res) => {

    const data = {
        id: 123,
        name: 'Eugene Wu',
        email: 'eugene.wu@unah.hn',
        password: '$dri3omweihfeˆ#$346.23823523',
        role: 'admin',
        phone: '1234-5678',
    };

    const payload = {
        id: data.id,
        role: data.role,

    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256', 
        expiresIn: '1h'
    })

    delete data.password


    res.json({
        success: true,
        message: 'Usuario autenticado correctamente',
        data: data,
        token
    })


}