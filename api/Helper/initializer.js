const license = require("../models/license")

module.exports = {

    User(email, password, name, lastname, birthdate, dni, path) {
        let user = {}
        user.email = email
        user.password = password
        user.name = name
        user.lastname = lastname
        user.birthdate = birthdate
        user.dni = dni
        let licenses = [{}]
        licenses[0].path = path
        user.licenses = licenses
        return user
    }


}