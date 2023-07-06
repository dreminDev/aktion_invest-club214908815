const { app } = require("../server");

const keksikValidation = require("../../../../pkg/utils/validations/keksikValidation");

function startRoutes() {
    app.get("/", (req, res) => res.send('Дима милерис гей, знайте это человеки!!!'))
    app.post('/keksikDonate', (req, res) => keksikValidation(req, res));
};

module.exports = {
    startRoutes,
};