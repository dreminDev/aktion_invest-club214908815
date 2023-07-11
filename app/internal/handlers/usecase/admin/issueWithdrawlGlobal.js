const { dbGlobal } = require("../../../domain/user/storage/mongo/managers/dbGlobalManagers");
const { handleError } = require("../../../../error/customError");
const { Utils } = require("../../../../pkg/utils/utils");


module.exports = async (msg) => {
    try {
        const userId = msg.userId || msg.senderId;

        const admin = await dbUser.getAdmins();

        if (!admin.includes(userId)) {
            return;
        };

        const { globalBalanceWithdrawal } = await dbGlobal.get({
            _id: 0, 
            globalBalanceWithdrawal: 1,
        });

        const utilsGlobalBalanceWithdrawal = Utils.formateNumberAddition(globalBalanceWithdrawal);

        const answerAmount = await msg.question(
            `💰 Введите - на сколько ₽ вы хотите пополнить вывод.\n\n💳 Сейчас пользователи могут вывести: ${utilsGlobalBalanceWithdrawal}`
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