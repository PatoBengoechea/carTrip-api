module.exports = router => { 
    const users = require('../controllers/userController')
    const User = require("../sequelize.js")

    router.post("/login", users.login)

    router.post("/user/register", users.register)

    router.get("/user", users.getAll)

};