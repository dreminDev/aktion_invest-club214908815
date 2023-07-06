const { model } = require('mongoose');

const Promocode = new model("promocode", {
    "promocode_name": {
        "type": "string",
        "required": "true",
    },
    "promocode_count": {
        "type": "number",
        "required": "true",
    },
    "promocode_amount": {
        "type": "number",
        "required": "true",
    },
});

module.exports = {
    Promocode,
};