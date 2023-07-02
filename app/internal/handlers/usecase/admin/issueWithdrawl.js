const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");
const { vkUtils } = require("../../../adapters/vk/vkUtils");

const { handleError } = require("../../../../pkg/utils/error/customError");
const { Utils } = require("../../../../pkg/utils/utils");
const { dbGlobal } = require("../../../domain/user/storage/mongo/managers/dbGlobalManagers");



module.exports = async (msg) => {
    try {
        const user = await msg.question(
            "📝 Отправь мне ссылку на пользователя."
        );

        const [userId, global] = await Promise.all([
            vkUtils.getId(user.text),
            dbGlobal.get({
                _id: 0,
                courseOutput: 1
            }),
        ]);

        const { courseOutput } = global;

        const answerAmount = await msg.question(
            "💰 Отправь сумму выдачи на баланс для вывода в ₽.",
        );

        const amount = Number(answerAmount.text * courseOutput);

        if (!amount) {
            throw new Error("not validation amount");
        };

        Promise.all([
            dbUser.incUserWithdrawalBalance(userId, amount),
            msg.send(`✅ Успешно, @id${userId} (пользователю) было выдано ${answerAmount.text}₽ на баланс для вывода.`),
        ]);

    } catch (error) {
        handleError(error, msg);
    }
};