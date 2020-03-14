const User = require("../models/user")

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send( {
            status: false,
            data: null,
            message: "Error al obtener usuario"
        })
    }
    const user = new User(req.body.email, req.body.password, req.body.name, req.body.lastname, req.body.birthdate, req.body.dni)
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({ 
                status: false,
                data: null,
                message: "Error al crear un usuario"
            })
        }

        else { 
            res.send({
                status: true,
                data: data,
                message: null
            })
        }
    })
}

exports.login = (req, res) => { 

    if (!req.body || req.body.email === null || req.body.password === null) {
        res.status(400).send({
            status: false,
            data: null,
            message: "Debes enviar un usuario y contraseña"
        })
    }

    User.findByEmail(req.body.email, (err, data) => {
        if (err) {
            res.status(500).send({ 
                status:false,
                data: null,
                message: "Usuario no encontrado"
            })
        } else {
            if (req.body.password === data.password) {
                res.send({
                    status:true,
                    data:data,
                    message: null
                })
            } else {
                res.status(500).send({
                    status:false,
                    data: null,
                    message: "Credenciales incorrectas"
                })
            }
        }
    })


}