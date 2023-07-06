const { updatesComment } = require("./vk/comment");

function bonusStart() {
    updatesComment();
};

module.exports = {
    bonusStart,
};