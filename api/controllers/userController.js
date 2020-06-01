const { User }  = require("../sequelize.js")
const Helper = require('../Helper/helper')
const init = require('../Helper/initializer')

exports.login = (req, res) => { 

    if (!req.body || req.body.email === null || req.body.password === null) {
        res.status(400).send({
            status: false,
            data: null,
            message: "Debes enviar un usuario y contraseña"
        })
    }

    User.findOne({ where: { email: req.body.email, password: req.body.password}})
    .then(user => { 
        if (user === null) {
            res.status(200).json(Helper.basicResponse(null, 'Usuario o contraseña inexistente'))
        } else {
            res.status(200).json(Helper.basicResponse(user, null))
        }
    } )
    .catch(err => res.status(500).json(Helper.basicResponse(null, err)))
}

exports.register = (req, res) => {
    if (!req.body || !req.body.email === null || !req.body.password === null || !req.body.name === null || !req.body.lastname === null ||
         !req.body.dni === null || req.body.birthdate === null) {
        res.status(400).send({
            status:false,
            data: null,
            message: "request vacia"
        })
    }
    let user = init.User(req.body.email, req.body.password, req.body.name, req.body.lastname, req.body.birthdate, req.body.dni)

    User.create(user)
    .then(user => res.json(Helper.basicResponse(user, null)))
    .catch(err => res.status(500).json(Helper.basicResponse(null, err)))
}

exports.getAll = (req, res) => {
    User.findAll()
    .then(users => res.json(Helper.basicResponse(users, null)))
    .catch(err => res.status(500).json(Helper.basicResponse(null, "Ha ocurrido un error al obtener los usuarios")))
}