module.exports = router => { 
    const users = require('../controllers/userController')

    router.post("/user", users.create)

    router.post("/login", users.login)

};