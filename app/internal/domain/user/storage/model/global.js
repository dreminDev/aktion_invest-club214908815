const { model } = require('mongoose');

const Global = new model("globals", {
    "refAmount": {
        "type": "number",
        "default": 26_000,
    },

    "courceDeposit": {
        "type": "number",
        "default": 10_000,
    },
    "courceOutput": {
        "type": "number",
        "default": 10_000,
    },
    
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