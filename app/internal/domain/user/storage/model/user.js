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

    "balance": {
        "type": "number",
        "default": 0,
        "index": "true",
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