const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");
const { dbPromocode } = require("../../../domain/user/storage/mongo/managers/dbPromocodeManagers");

const { Utils } = require("../../../../pkg/utils/utils");
const { handleError } = require("../../../../error/customError");



module.exports = async (msg) => {
    try {
        const userId = msg.userId || msg.senderId;

        const admin = await dbUser.getAdmins();

        if (!admin.includes(userId)) {
            return;
        };

        const name = await msg.question(
            '📝 Напишите название промокода.'
        );

        const amountAnswer = await msg.question(
            '💰 Сколько пользователь получит за активацию?'
        );

        const amount = amountAnswer.text;

        if (!Number(amount)) {
            throw new Error("not validation amount");
        };

        const countActivateAnswer = await msg.question(
            '👥 Напишите сколько активации'
        );

        const countActivate = countActivateAnswer.text;

        if (!Number(countActivate)) {
            throw new Error("not validation amount");
        };

        Promise.all([
            dbPromocode.add({
                promocode_name: name.text,
                promocode_count: countActivate,
                promocode_amount: amount,
            }), 

            msg.send(`🎉 Успешное создание промокода.\n\n• Название: ${name.text}\n• Сумма: ${Utils.formateNumberAddition(amount)}\n• Количество активаций: ${countActivate}`),
        ]);
    } catch (error) {
        handleError(error, msg);
    };
};