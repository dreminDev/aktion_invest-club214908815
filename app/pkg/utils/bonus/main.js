const { updatesComment } = require("./vk/comment");
const { updateLike, updateLastPostLike } = require("./vk/like");

function bonusStart() {
    updatesComment();
    
    updateLike();
    updateLastPostLike();
};

module.exports = {
    bonusStart,
};