/* Modulos */
const express = require("express"); // Permite crear servidores
const bodyParser = require("body-parser"); // Permite entender peticiones POST

const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./api/routes/user.routes.js")(app);
require("./api/routes/car.routes.js")(app);
require("./api/routes/carForRoad.routes.js")(app)
require("./api/routes/trip.routes.js")(app)

app.listen(port, (err) => {
    console.log("We are listen on port: ", port)
});