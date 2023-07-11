const { vkShort } = require("../../../adapters/vk/vkUtils");
const { getPaymentKeksikQiwi } = require("../../../domain/user/service/service");
const { handleError } = require("../../../../error/customError");

module.exports = async (msg) => {
    try {
        const userId = msg.userId || msg.senderId;

        const { amount } = await getPaymentKeksikQiwi(userId);

        Promise.all([
            vkShort.sendAnswer(msg, `✅ Вы успешно вывели ${amount}₽`),
            // vkShort.sendMsg(userId, "🎉 Успешный вывод! Оставьте отзыв тут - https://vk.com/topic-214908815_48989783"),
            vkShort.sendMsg(userId, "📋 Вывод в обработке."),
        ]);
    } catch (error) {
        handleError(error, msg);
    };
};