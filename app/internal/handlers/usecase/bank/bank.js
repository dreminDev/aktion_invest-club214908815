const { getVkDonutInfoUser } = require("../../../domain/user/service/service");
const { bankKeyboard } = require("../../../../pkg/keyboard/inline");



module.exports = async (msg) => {
    const userId = msg.senderId || msg.userId;

    const { vkDonut } = await getVkDonutInfoUser(userId);

    msg.send(`🏦 Банк - отличная возможность заработать подписчикам VK Donut 🍩\n\n• В случайное время банк будет пополнен и любые 10 человек которые первыми успеют забрать приз поделят сумму банка пополам!\n• Подробнее когда будет пополнен банк написано на стене группы.`,
        {
            keyboard: bankKeyboard(vkDonut),
            attachment: "photo-214908815_457239054",
        });
};