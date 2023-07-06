const { set, connect } = require("mongoose");

require("dotenv").config()

const { Utils } = require("../../utils");

const MONGO_URL = process.env.MONGO_URL;

function dbConnect() {
    set('strictQuery', true);

    connect(MONGO_URL)
        .then(() => console.log(`[ ${Utils.getTime()} || CONNECT MONGODB ]`))
        .catch((err) => console.log(`[ ${Utils.getTime()} || MONGO ERR`, err));
};

module.exports = {
    dbConnect,
};