const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");
const { vkUtils } = require("../../../adapters/vk/vkUtils");

const { Utils } = require("../../../../pkg/utils/utils");
const { handleError } = require("../../../../error/customError");



module.exports = async (msg) => {
    try {
        const admin = await dbUser.getAdmins();

        if (!admin.includes(userId)) {
            return;
        };

        const user = await msg.question(
            "📝 Отправь мне ссылку на пользователя."
        );

        const userId = await vkUtils.getId(user.text);

        const answerAmount = await msg.question(
            "💰 Отправь сумму выдачи.",
        );

        const amount = Number(answerAmount.text);

        if (!amount) {
            throw new Error("not validation amount");
        };

        const utilsFormateAmount = Utils.formateNumberAddition(amount);

        Promise.all([
            dbUser.incUserBalance(userId, amount),
            msg.send(`✅ Успешно, @id${userId} (пользователю) было выдано ${utilsFormateAmount} баланс для покупок.`),
        ]);

    } catch (error) {
        handleError(error, msg);
    }
};