const { handleError } = require("../../../../pkg/utils/error/customError");
const { vkShort } = require("../../../adapters/vk/vkUtils");
const { getPaymentKeksikQiwi } = require("../../../domain/user/service/service");

module.exports = async (msg) => {
    try {
        const userId = msg.userId || msg.senderId;

        const { amount } = await getPaymentKeksikQiwi(userId);

        Promise.all([
            vkShort.sendAnswer(msg, `✅ Вы успешно вывели ${amount}₽`),
        ]);
    } catch (error) {
        handleError(error, msg);
    };
};