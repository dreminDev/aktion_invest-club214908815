const { buyPoints } = require("../../../domain/user/service/service");
const { handleError } = require("../../../../pkg/utils/error/customError");
const { vkShort } = require("../../../adapters/vk/vkUtils");



module.exports = async (msg) => {
    const userId = msg.userId ? msg.userId : msg.senderId;

    try {
        const payload = msg?.eventPayload?.numberPoint;

        if (payload < 1 || payload > 5) {
            return;
        };

        const data = await buyPoints(userId, payload);

        Promise.all([
            vkShort.sendAnswer(msg, "✅ Вы успешно купили акцию!"),

            vkShort.sendMsg(userId, "Спасибо за покупку!"),
        ]);

    } catch (err) {
        handleError(err, msg);
    };
};