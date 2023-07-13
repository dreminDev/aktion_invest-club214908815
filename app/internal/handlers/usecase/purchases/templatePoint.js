const { Utils } = require("../../../../pkg/utils/utils");
const { amountAction } = require("./amount.json");



module.exports = async (msg) => {
    const onePoint = Utils.formatNumber(amountAction[1]);
    const twoPoint = Utils.formatNumber(amountAction[2]);
    const threePoint = Utils.formatNumber(amountAction[3]);
    const fourPoint = Utils.formatNumber(amountAction[4]);
    const fivePoint = Utils.formatNumber(amountAction[5]);

    msg.send(`🎩 Выбирай акции •`, {
        template: JSON.stringify({
            type: 'carousel',
            elements: [
                {
                    title: 'Huawei',
                    description: `💲Цена: ${onePoint}$\n📆 Срок окупаемости: 6 месяцев`,
                    photo_id: '-214908815_457239082',
                    buttons: [
                        {
                            action: {
                                type: 'callback',
                                label: '💰 Купить',
                                payload: {
                                    command: 'point.buy',
                                    numberPoint: '1'
                                },
                            },
                        },
                    ],
                },
                {
                    title: 'Mini',
                    description: `💲Цена: ${twoPoint}$\n📆 Срок окупаемости: 5 месяцев`,
                    photo_id: '-214908815_457239083',
                    buttons: [
                        {
                            action: {
                                type: 'callback',
                                label: '💰 Купить',
                                payload: {
                                    command: 'point.buy',
                                    numberPoint: '2'
                                },
                            },
                        },
                    ],
                },
                {
                    title: 'Chanel',
                    description: `💲Цена: ${threePoint}$\n📆 Срок окупаемости: 4.5 месяцев`,
                    photo_id: '-214908815_457239085',
                    buttons: [
                        {
                            action: {
                                type: 'callback',
                                label: '💰 Купить',
                                payload: {
                                    command: 'point.buy',
                                    numberPoint: '3'
                                },
                            },
                        },
                    ],
                },
                {
                    title: 'Nvidia',
                    description: `💲Цена: ${fourPoint}$\n📆 Срок окупаемости: 3 месяца`,
                    photo_id: '-214908815_457239084',
                    buttons: [
                        {
                            action: {
                                type: 'callback',
                                label: '💰 Купить',
                                payload: {
                                    command: 'point.buy',
                                    numberPoint: '4'
                                },
                            },
                        },
                    ],
                },
                {
                    title: 'Amazon',
                    description: `💲Цена: ${fivePoint}$\n📆 Срок окупаемости: 1.5 месяца`,
                    photo_id: '-214908815_457239077',
                    buttons: [
                        {
                            action: {
                                type: 'callback',
                                label: '💰 Купить',
                                payload: {
                                    command: 'point.buy',
                                    numberPoint: '5'
                                },
                            },
                        },
                    ],
                },
            ],
        }),
    });
};