const { getBankWithdrawlUser } = require("../../../domain/user/service/service");

const { vkShort } = require("../../../adapters/vk/vkUtils");
const { Utils } = require("../../../../pkg/utils/utils");
const { handleError } = require("../../../../error/customError");



module.exports = async (msg) => {
    try {
        const userId = msg.senderId || msg.userId;

        const { amount } = await getBankWithdrawlUser(userId);

        const utilsAmount = Utils.formateNumberAddition(amount);

        Promise.all([
            vkShort.sendAnswer(
                msg, `🍩 Ты собрал ${utilsAmount}₽ с банка. Деньги доступны к выводу.`,
            ),
            vkShort.sendMsg(
                "606771449, 459128426",
                `👥 Пользователь vk.com/id${userId} собрал банк!`,
            )
        ]);
    } catch (error) {
        handleError(error, msg);
    };
};