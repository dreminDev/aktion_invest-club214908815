const { model } = require('mongoose');

function validateID(id) {
    return id > 0;
};

const User = new model("users", {
    "id": {
        "type": "number",
        "validate": {
            "validator": validateID,
            "message": props => `${props.value} is not valid user id`
        },
        unique: true,
        "index": "true",
        "required": "true",
    },
    
    "referrerId": {
        "type": "number",
        "index": "true",
        "required": "true",
    },

    "referralCount": {
        "type": "number",
        "default": 0,
        "index": "true",
    },

    "vkDonut": {
        "type": "boolean",
        "default": false,
    },

    "balance": {
        "type": "number",
        "default": 0,
    },

    "perDayInc": {
        "type": "number",
        "default": 0,
        "index": "true",
    },

    "availableBalance": {
        "type": "number",
        "default": 0,
        "index": "true",
    },

    "qiwiNumber": {
        "type": "string",
        "default": '',
    },

    "ban": {
        "type": "boolean",
        "default": "false",
    },

    "admin": { 
        "type": "boolean",
        "index": "true",
        "required": "true",
        "default": "false"
    },

});

module.exports = {
    User,
};