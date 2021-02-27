const { Payment, CreditCard } = require('../sequelize.js')
const Helper = require('../Helper/helper')
const { Op } = require("sequelize")


exports.addCreditCard = (req, res) => {
    CreditCard.create({
            idUser: req.body.idUser,
            creditCardNumber: req.body.creditCardNumber,
            holderName: req.body.holderName,
            monthExpiration: req.body.monthExpiration,
            yearExpiration: req.body.yearExpiration,
            ccv: req.body.ccv
        })
        .then(creditCard => {
            res.status(200).json(Helper.basicResponse({ creditCard: creditCard }, null))
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(Helper.basicResponse(null, err))
        })
}

exports.getAllCreditCards = (req, res) => {
    CreditCard.findAll({
            where: {
                idUser: req.params.id
            }
        })
        .then(creditCards => {
            res.status(200).json(Helper.basicResponse({ creditCards: creditCards }, null))
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(Helper.basicResponse(null, err))
        })
}

exports.getOne = (req, res) => {
    CreditCard.findOne({
            where: {
                idUser: req.params.id
            }
        })
        .then(creditCard => {
            if (creditCard == null) {
                res.status(200).json(Helper.basicResponse({ creditCards: false }, null))
            } else {
                res.status(200).json(Helper.basicResponse({ creditCards: creditCard }, null))
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(Helper.basicResponse(null, err))
        })
}