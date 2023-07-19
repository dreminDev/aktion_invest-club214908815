const { updatesComment } = require("./vk/comment");
const { updateLike, updateLastPostLike } = require("./vk/like");
const { subGroup } = require("./vk/subscription");

function bonusStart() {
    updatesComment();
    
    updateLike();
    updateLastPostLike();

    subGroup();
};

module.exports = {
    bonusStart,
};