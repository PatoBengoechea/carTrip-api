const sql = require("../db")

const User = function(email, password, name, lastname, birthdate, dni) { 
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.dni = dni;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ? ", newUser, (err, res)=> { 
        if(err) {
            console.log("error", err)
            result(err, null)
            return
        }

        console.log("user created: ", { id: res.insertId, ...newUser})
        result(null, { id: res.insertId, ...newUser})
    })
}

User.findByEmail = (userEmail, result) => {
    sql.query("Select * from user where email = '" + userEmail + "'", (err, res)=> {
        if(err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.length) { 
            console.log("found user: ", res[0])
            result(null, JSON.parse(JSON.stringify(res[0])))
            return
        }

        result({ kind: "user not found"}, null)
    })
}

module.exports = User;