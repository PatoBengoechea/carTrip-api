module.exports = {
 
    User(email, password, name, lastname, birthdate, dni) {
        let user = { }
        user.email = email
        user.password = password
        user.name = name
        user.lastname = lastname
        user.birthdate = birthdate
        user.dni = dni
        return user
    }

    
}