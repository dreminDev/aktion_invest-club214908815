const { getVkDonutInfoUser } = require("../../../domain/user/service/service");
const { bankKeyboard } = require("../../../../pkg/keyboard/inline");



module.exports = async (msg) => {
    const userId = msg.senderId || msg.userId;

    const { vkDonut } = await getVkDonutInfoUser(userId);

    msg.send(`🏦 Банк - отличная возможность заработать подписчикам VK Donut 🍩

• В случайное время банк будет пополнен и любые 5-10 человек которые первыми успеют забрать приз поделят сумму банка пополам!
• Подробнее когда будет пополнен банк и сколько человек смогут забрать написано на стене группы.`,
        {
            keyboard: bankKeyboard(vkDonut),
            attachment: "photo-214908815_457239054",
        });
};