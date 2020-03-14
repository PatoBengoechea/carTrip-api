/* Modulos */
const express = require("express"); // Permite crear servidores
const bodyParser = require("body-parser"); // Permite entender peticiones POST

const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
	res.json({ message: "Welcome to bezkoder application." });
  });

require("./api/routes/user.js")(app);

app.listen(port, (err) => {
	console.log("We are listen on port: ", port)
	});