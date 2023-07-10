const { model } = require('mongoose');

// bread
function validateID(id) {
    return id > 0;
};

const User = new model("users", {
    "id": {
        "type": "number",
        "validate": {
            "validator": validateID, // мог бы и тут прописать функцию
            "message": props => `${props.value} is not valid user id` // красава
        },
        unique: true, // а кавычки где
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
        "index": "true",
    },

    "isPurchasedVkDonut": {
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

    "taxCharged": {
        "type": "boolean",
        "default": false,
    },

    "lastChargedAt": {
        "type": "number",
        "default": 0,
    },
    
    "lastBonusAt": {
        "type": "number",
        "default": 0,
    },

    "withdrawTaxAt": {
        "type": "number",
        "default": 0,
    },
    
    "bonusDay": {
      "type": "number",
      "default": 1
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