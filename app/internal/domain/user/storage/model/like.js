const { model } = require('mongoose');

const Like = new model("likers", {
    "likerId": {
        "type": "number",
        "index": "true",
        "required": "true",
    },

    "postId": {
        "type": "number",
        "index": "true",
        "required": "true",
    },

    "amount": {
        "type": "number",
        "required": "true",
    },

    "created_at": {
        "type": "number",
        "required": "true",
    },
});

module.exports = {
    Like,
};