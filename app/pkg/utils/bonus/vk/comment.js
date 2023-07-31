const { updates } = require("../../../../internal/adapters/vk/vk");
const { getCommentUser } = require("../../../../internal/domain/user/service/serviceBonus");

const { vkShort } = require("../../../../internal/adapters/vk/vkUtils");
const { handleError } = require("../../../../error/customError");

const amountBonuses = require("../../../../../amountBonuses.json");

function updatesComment() {
    updates.on('comment', async (msg) => {
        try {
            const userId = msg.fromId || msg.deleterUserId;
            const subTypes = msg.subTypes;

            const data = await getCommentUser(userId, subTypes);

            if (subTypes.includes("wall_reply_new")) {
                vkShort.sendMsg(userId, `🎉 Ты получил ${amountBonuses.comment}$ за комментарий`);
            };

            if (subTypes.includes("wall_reply_delete")) {
                vkShort.sendMsg(userId, `🚫 Ты потерял ${amountBonuses.comment}$ за удаление комментария`);
            };

        } catch (error) {
            handleError(error, msg);
        };
    });
};

module.exports = {
    updatesComment,
};