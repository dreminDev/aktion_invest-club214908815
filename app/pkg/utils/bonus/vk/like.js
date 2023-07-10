const { updates } = require("../../../../internal/adapters/vk/vk");
const { getUpdateLastPostId, getLikeUser } = require("../../../../internal/domain/user/service/serviceBonus");
const { handleError } = require("../../../../error/customError");
const { Utils } = require("../../utils");
const { vkShort } = require("../../../../internal/adapters/vk/vkUtils");

function updateLike() {
    updates.on('like', async (msg) => {
        try {
            const userId = msg.likerId;
            const postId = msg.objectId;
            const subTypes = msg.subTypes;
            const objectType = msg.objectType;

            if (objectType !== 'post' || (subTypes).includes('like_remove')) {
                return;
            };

            const data = await getLikeUser(userId, postId);

            const utilsAmount = Utils.formateNumberAddition(data.amount);

            vkShort.sendMsg(userId, `🎉 +${utilsAmount}$ за лайк!`);
        
        } catch (error) {
            handleError(error, msg);
        };
    });
};

function updateLastPostLike() {
    updates.on("wall_post_new", async (msg) => {
        const postId = msg.wall.id;

        const data = await getUpdateLastPostId(postId);
    });
};

module.exports = {
    updateLike,
    updateLastPostLike,
}