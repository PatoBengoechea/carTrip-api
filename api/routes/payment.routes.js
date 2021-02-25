module.exports = router => {
    const payment = require('../controllers/paymentController')

    router.post('/creditcard', payment.addCreditCard)

    router.get("/creditcards/:id", payment.getAllCreditCards)

    router.get("/creditcard/:id", payment.getOne)
};