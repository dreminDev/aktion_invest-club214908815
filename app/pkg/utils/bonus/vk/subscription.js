const { getSubscribed } = require("../../../../internal/domain/user/service/serviceBonus");

const { updates } = require("../../../../internal/adapters/vk/vk");
const { vkShort } = require("../../../../internal/adapters/vk/vkUtils");


async function subGroup() {
    updates.on('group_member', async (msg) => {
            const userId = msg.userId;
            const subTypes = msg.subTypes;

            const data = await getSubscribed(userId, subTypes);

            switch (data.type) {
                case 1:
                    vkShort.sendMsg(userId, `📛 Ты отписался, мы забрали у тебя акцию «CHANEL»`);
                    break;
                case 2:
                    vkShort.sendMsg(userId, `🎉 Спасибо за подписку, ты получил акцию «CHANEL»`);
                    break;
                default: 
                    break;
            };
    });
};

module.exports = {
    subGroup,
};