const { model } = require('mongoose');

const Global = new model("globals", {
    "depositTotal": {
        "type": "number",
        "default": 0,
    },
    "outputTotal": {
        "type": "number",
        "default": 0,
    },

    "depositDay": {
        "type": "number",
        "default": 0,
    },
    "outputDay": {
        "type": "number",
        "default": 0,
    },

});

module.exports = {
    Global,
};