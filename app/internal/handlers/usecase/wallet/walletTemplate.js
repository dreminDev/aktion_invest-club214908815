const { getWalletTemplateData } = require("../../../domain/user/service/service");

require("dotenv").config();

const GROUP_ID = process.env.GROUP_ID;

module.exports = async (msg) => {
    const userId = msg.senderId;

    const { courseDeposit, availableBalance } = await getWalletTemplateData(userId);

    msg.send(`👛 Крипто кошелек •`, {
        template: JSON.stringify({
            type: 'carousel',
            elements: [
                {
                    title: '⬆️ Пополнить',
                    description: `💰 Пополнить: ${courseDeposit} = 1₽`,
                    photo_id: '-214908815_457239029',
                    buttons: [
                        {
                            action: {
                                type: 'open_link',
                                label: '💰 Купить',
                                link: `https://vk.com/app6887721_-${GROUP_ID}#donate_50&op`,
                            },
                        },
                    ],
                },
                {
                    title: '⬇️ Вывести',
                    description: `💸 Доступно к выводу: ${availableBalance}₽`,
                    photo_id: '-214908815_457239030',
                    buttons: [
                        {
                            action: {
                                type: 'callback',
                                label: '💸 Вывести',
                                payload: {
                                    command: 'output.qiwi',
                                },
                            },
                        },
                    ],
                },
            ],
        }),
    });
};