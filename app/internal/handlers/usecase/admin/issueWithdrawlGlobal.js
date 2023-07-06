const { dbGlobal } = require("../../../domain/user/storage/mongo/managers/dbGlobalManagers");
const { handleError } = require("../../../../error/customError");


module.exports = async (msg) => {
    try {
        const answerAmount = await msg.question(
            "💰 Введите - на сколько ₽ вы хотите пополнить вывод."
        );

        const amount = Number(answerAmount.text);

        if (!amount) {
            throw new Error("not validation amount");
        };

        Promise.all([
            dbGlobal.incWithdrawalBalance(amount),
            msg.send(`✅ Успешно, вывод пополнен на ${amount}₽`),
        ]);

    } catch (error) {
        handleError(error, msg);
    }
};