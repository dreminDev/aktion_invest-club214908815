const { dbGlobal } = require("../../../domain/user/storage/mongo/managers/dbGlobalManagers");
const { handleError } = require("../../../../pkg/utils/error/customError");



module.exports = async (msg) => {
    try {
        const answerAmount = await msg.question(
            "💰 Отправь сумму сколько получит каждый из 10 человек.",
        );

        const amount = Number(answerAmount.text);

        if (!amount) {
            throw new Error("not validation amount");
        };

        Promise.all([
            dbGlobal.depositBank(amount),
            msg.send(`🏦 Банк успешно пополнен на ${amount * 10}₽\n👥 10 человек получат по ${amount}₽!`),
        ]);

    } catch (error) {
        handleError(error, msg);
    }
};