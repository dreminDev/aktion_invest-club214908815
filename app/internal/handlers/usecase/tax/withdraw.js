const { handleError } = require("../../../../error/customError");
const { payWithdrawTax } = require("../../../domain/user/service/service");

module.exports = async (msg) => {
    try {
        const userId = msg.senderId || msg.userId;

        const data = await payWithdrawTax(userId);
        
        msg.send(`🎉 Успешно оплачена комиссия! 25% от баланса для вывода.`);

    } catch (error) {
        handleError(error, msg);
    };
};