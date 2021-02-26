module.exports = router => {
    const users = require('../controllers/userController')
    const User = require("../sequelize.js")

    router.post("/login", users.login)

    router.post("/user/register", users.register)

    router.get("/user", users.getAll)

    router.get("/user/license/:id", users.getMyLicense)

    router.post("/user/license", users.createLicense)

};