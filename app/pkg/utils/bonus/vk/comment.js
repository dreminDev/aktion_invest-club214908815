const { updates } = require("../../../../internal/adapters/vk/vk");
const { getCommentUser } = require("../../../../internal/domain/user/service/serviceBonus");

const { vkShort } = require("../../../../internal/adapters/vk/vkUtils");
const { handleError } = require("../../../../error/customError");



function updatesComment() {
    updates.on('comment', async (msg) => {
        try {
            const userId = msg.fromId || msg.deleterUserId;
            const subTypes = msg.subTypes;

            const data = await getCommentUser(userId, subTypes);

            if (subTypes.includes("wall_reply_new")) {
                vkShort.sendMsg(userId, "🎉 Ты получил 15$ за комментарий");
            };

            if (subTypes.includes("wall_reply_delete")) {
                vkShort.sendMsg(userId, "🚫 Ты потерял 15$ за удаление комментария");
            };

        } catch (error) {
            handleError(error, msg);
        };
    });
};

module.exports = {
    updatesComment,
};