const { getChargeTaxPayment } = require("../../../domain/user/service/service");
const { vkShort } = require("../../../adapters/vk/vkUtils");

const { Utils } = require("../../../../pkg/utils/utils");
const { handleError } = require("../../../../error/customError");



module.exports = async (msg) => {
    try {
        const userId = msg.senderId || msg.userId;
        
        const { amount } = await getChargeTaxPayment(userId);
        
        const utilsAmount = Utils.formateNumberAddition(amount);

        vkShort.sendMsg(userId, `🎉 Успешная оплата. ${utilsAmount}$`);

    } catch (error) {
        handleError(error, msg);
    }
};