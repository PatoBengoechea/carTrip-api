module.exports = router => {
    const payment = require('../controllers/paymentController')

    router.post('/creditcard', payment.addCreditCard)

    router.get("/creditcard/:id", payment.getAllCreditCards)
};