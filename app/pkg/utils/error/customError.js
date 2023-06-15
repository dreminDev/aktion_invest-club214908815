const { vkShort } = require("../../../internal/adapters/vk/vkUtils");

function handleError(error, msg) {
    const userId = msg.senderId ? msg.userId : msg.senderId;

    switch (error.message) {
        case "qiwi number failed validation":
            vkShort.sendMsg(userId, '❗️ Номер введён неправильно, формат был предоставлен выше.')
            break;
        case "insufficient balance":
            vkShort.sendAnswer(msg, '🙁 Недостаточно средств!');
            break;
    };
};

module.exports = {
    handleError,
};