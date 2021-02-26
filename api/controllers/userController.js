const { User, License } = require("../sequelize.js")
const Helper = require('../Helper/helper')
const init = require('../Helper/initializer')
const user = require("../models/user.js")
const { Sequelize } = require("sequelize")

exports.login = (req, res) => {

    if (!req.body || req.body.email === null || req.body.password === null) {
        res.status(400).send({
            status: false,
            data: null,
            message: "Debes enviar un usuario y contraseña"
        })
    }

    User.findOne({ where: { email: req.body.email, password: req.body.password } })
        .then(user => {
            if (user === null) {
                res.status(200).json(Helper.basicResponse(null, 'Usuario o contraseña inexistente'))
            } else {
                res.status(200).json(Helper.basicResponse(user, null))
            }
        })
        .catch(err => res.status(500).json(Helper.basicResponse(null, err)))
}

exports.register = (req, res) => {
    if (!req.body || !req.body.email === null || !req.body.password === null || !req.body.name === null || !req.body.lastname === null ||
        !req.body.dni === null || req.body.birthdate === null) {
        res.status(400).send({
            status: false,
            data: null,
            message: "request vacia"
        })
    }

    let user = init.User(req.body.email, req.body.password, req.body.name, req.body.lastname, req.body.birthdate, req.body.dni, req.body.path)

    if (req.body.path == undefined) {
        User.create(user)
            .then(user => res.json(Helper.basicResponse(user, null)))
            .catch(err => res.status(500).json(Helper.basicResponse(null, err)))
    } else {
        User.create(user, {
                include: License
            })
            .then(user => res.json(Helper.basicResponse(user, null)))
            .catch(err => res.status(500).json(Helper.basicResponse(null, err)))
    }
}

exports.getMyLicense = (req, res) => {
    License.findOne({
            where: {
                idUser: req.params.id
            },
            attributes: {
                include: [Sequelize.fn('max', Sequelize.col('expireDate'))]
            },
            group: 'idLicense'
        })
        .then(license => {
            let fullDate = new Date()
            let today = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate())
            if (license != null) {
                let license2 = {
                    idUser: license.idUser,
                    path: license.path,
                    expireDate: license.expireDate,
                    isDateExpired: (license.expireDate < today)
                }
                res.json(Helper.basicResponse(license2, null))
            }

            res.json(Helper.basicResponse(false, null))
        })

    .catch(err => {
        console.log(err)
        if (err != null) {
            res.status(500).json(Helper.basicResponse({}, err))
        } else {
            res.status(200).json(Helper.basicResponse(false, null))
        }
    })
}

exports.getAll = (req, res) => {
    User.findAll()
        .then(users => res.json(Helper.basicResponse(users, null)))
        .catch(err => res.status(500).json(Helper.basicResponse(null, "Ha ocurrido un error al obtener los usuarios")))
}

exports.createLicense = (req, res) => {
    License.create({
            idUser: req.body.idUser,
            path: req.body.path
        }).then(license => {
            console.log(license)
            res.json(Helper.basicResponse({ license: license }, null))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(Helper.basicResponse(null, "No se ha podido cargar la licencia de conducir"))
        })
}