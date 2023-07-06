const { handleError } = require("../../../../error/customError");
const { getBonusDaily } = require("../../../domain/user/service/serviceBonus");

const { Utils } = require("../../../../pkg/utils/utils");

module.exports = async (msg) => {
    try {

        const userId = msg.senderId;

        const data = await getBonusDaily(userId);

        const utilsAmount = Utils.formateNumberAddition(data.amount);

        msg.send(`🎉 Успешно! Улучшенный рандом, ты получил ${utilsAmount}$`)
    } catch (error) {
        handleError(error, msg)
    }
};