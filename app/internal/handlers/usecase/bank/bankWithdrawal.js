const { getBankWithdrawlUser } = require("../../../domain/user/service/service");
const { vkShort } = require("../../../adapters/vk/vkUtils");
const { Utils } = require("../../../../pkg/utils/utils");
const { handleError } = require("../../../../pkg/utils/error/customError");

require("dotenv").config();

const ADMIN_ID = process.env.ADMINS_ID.includes(0);

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
                ADMIN_ID,
                `👥 Пользователь vk.com/id${userId} собрал банк!`,
            )
        ]);
    } catch (error) {
        handleError(error, msg);
    };
};