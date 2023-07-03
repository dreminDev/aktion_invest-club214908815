const { vkShort } = require("../../../internal/adapters/vk/vkUtils");

require("dotenv").config();

const GROUP_ID = process.env.GROUP_ID

function handleError(error, msg) {
    const userId = msg.senderId || msg.userId;

    switch (error.message) {
        case "qiwi number failed validation":
            vkShort.sendMsg(userId, "❗️ Номер введён неправильно, формат был предоставлен выше.");
            break;
        case "insufficient balance":
            vkShort.sendAnswer(msg, "🙁 Недостаточно средств!");
            break;
        case "missing QIWI number": 
            vkShort.sendMsg(userId, "❗️ У вас не указан номер QIWI");
            break;
        case "the balance is less than the validation amount": 
            vkShort.sendMsg(userId, "❗️ Минимальный вывод 20₽");
            break;
        case "missing vkDonut subscription":
            vkShort.sendMsg(userId, `🍩 Чтобы использовать это, нужен VK Donut\n\n🔗 Купить: https://vk.com/donut/club${GROUP_ID}`);
            break;
        case "the bot's reserve is over":
            vkShort.sendAnswer(msg, "💲 Дневной резерв бота кончился. Приходи завтра");
            break;
        case "resolveResource is not defined":
            vkShort.sendMsg(userId, "❗️ Вы отправили не ссылку или пользователя/группы не существует.")
            break;
        case "not validation amount":
            vkShort.sendMsg(userId, "❗️ Вы отправили не число.");
            break;
        case "all the players took the pot":
            vkShort.sendAnswer(msg, "😶 Пока банк пуст, следи за постами в группе");
            break;
        case "you have already collected the bank":
            vkShort.sendAnswer(msg, "❗️ Вы уже собирали банк сегодня.");
            break;
        default: 
            console.log(error);
            vkShort.sendMsg(userId, "❗️ Неизвестная ошибка :(");
    };
};

module.exports = {
    handleError,
};