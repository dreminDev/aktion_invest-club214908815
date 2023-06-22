const { app } = require("../server");

const keksikValidation = require("../../../../pkg/utils/validations/keksikValidation");

function startRoutes() {
    app.post('/keksikDonate', (req, res) => keksikValidation(req, res));
};

module.exports = {
    startRoutes,
};