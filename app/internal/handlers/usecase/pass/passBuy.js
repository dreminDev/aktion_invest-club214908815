const { passBuy } = require('../../../domain/user/service/service');

const { vkUtils } = require('../../../adapters/vk/vkUtils');
const { handleError } = require('../../../../error/customError');

module.exports = async msg => {
    try {
        const userId = msg.senderId || msg.userId;

        const data = await passBuy(userId);

        vkUtils.sendEventAnswer({
            eventId: msg.eventId,
            userId,
            peerId: msg.peerId,
            text: "😁 Вы успешно купили пасс",
        });

    } catch (error) {
        handleError(error, msg);
    };
};
