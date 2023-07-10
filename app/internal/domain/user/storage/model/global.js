const { model } = require('mongoose');

const Global = new model("globals", {
    "refAmount": {
        "type": "number",
        "default": 26_000,
    },

    "globalBalanceWithdrawal": {
        "type": "number",
        "default": 0, 
    }, 

    "likePost": {
        "type": "number",
        "default": 1663, 
    },    

    "bank": {
        "amount": {
            "type": "number",
            "default": 0, 
        }, 
        "count": {
            "type": "number",
            "default": 0, 
        },
        "usersBank": {
            "type": "array", 
        },
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