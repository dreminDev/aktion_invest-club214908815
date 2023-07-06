const { model } = require('mongoose');

const PromocodeActivations = new model("promocodeActivations", {
    "userId": {
        "type": Number,
        "required": true,
    },
    "promocode_name": {
        "type": String,
        "required": true,
    },
    "promocode_amount": {
        "type": Number,
        "required": true,
    },
    "created_at": {
        "type": Number,
        "required": true,
    },
});

module.exports = {
    PromocodeActivations,
};