const { chargeAmount } = require("../../../domain/user/service/service");
const { Utils } = require("../../../../pkg/utils/utils");

const { taxPaymentKeyboard } = require("../../../../pkg/keyboard/inline");
const { handleError } = require("../../../../error/customError");



module.exports = async (msg) => {
    try {
        const userId = msg.senderId || msg.userId;
    
        const { amount, vkDonut, perDayInc } = await chargeAmount(userId);

        const utilsAmount = Utils.formateNumberAddition(amount);

        if (!perDayInc) {
            return msg.send("🚫 У вас отсутствуют акции, налога нет.\n• Налог появится при покупке любой акции.");
        };

        if (vkDonut) {
            return msg.send("🎉 Для вас (подписчиков VKDonut) налог отсутствует.");
        };

        msg.send(`💲 Налоги:\n\n• Твой текущий налог: ${utilsAmount}$\n• Ежедневно налог составляет 5.000$\n• При неуплате налогов 7 дней подряд, ваш доход приостанавливается и сумма к оплате становится х2 от суммы которая накапала за 7 дней.`, 
        {
            keyboard: taxPaymentKeyboard,
        });

    } catch (error) {
        handleError(error, msg);
    }
};