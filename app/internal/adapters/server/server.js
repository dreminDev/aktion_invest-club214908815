const express = require("express");
const { Utils } = require("../../../pkg/utils/utils");

const app = express();

app.use(express.json());

require("dotenv").config();

const SERVER_PORT = process.env.SERVER_PORT;



function serverStart() {
    app.listen(SERVER_PORT || 3000, (err) => {
        if (err) {
            console.log(err);
        };

        console.log(`[ ${Utils.getTime()} || SERVER STARTED PORT: ${SERVER_PORT} ]`)
    });
};

module.exports = {
    serverStart,
    app,
};