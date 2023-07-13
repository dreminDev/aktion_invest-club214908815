const { dbGlobal } = require("../../../domain/user/storage/mongo/managers/dbGlobalManagers");
const { handleError } = require("../../../../error/customError");



module.exports = async (msg) => {
    try {
        const userId = msg.userId || msg.senderId;

        const admin = await dbUser.getAdmins();

        if (!admin.includes(userId)) {
            return;
        };

        const countAnswer = await msg.question(
            "💰 Введите сколько человек смогут забрать банк."
        );

        const count = Number(countAnswer.text);

        if (!count) {
            throw new Error("not validation amount");
        };


        const answerAmount = await msg.question(
            `💰 Отправь сумму сколько получит каждый из ${count} человек.`,
        );

        const amount = Number(answerAmount.text);

        if (!amount) {
            throw new Error("not validation amount");
        };

        Promise.all([
            dbGlobal.depositBank(amount, count),
            msg.send(`🏦 Банк успешно пополнен на ${amount * count}₽\n👥 ${count} человек получат по ${amount}₽!`),
        ]);

    } catch (error) {
        handleError(error, msg);
    }
};