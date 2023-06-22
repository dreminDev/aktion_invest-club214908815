const { model } = require('mongoose');

const Global = new model("globals", {
    "refAmount": {
        "type": "number",
        "default": 26_000,
    },

    "courseDeposit": {
        "type": "number",
        "default": 18_000,
    },
    "courseOutput": {
        "type": "number",
        "default": 18_000,
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