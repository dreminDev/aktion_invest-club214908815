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
                    title: '🤩 Яндекс',
                    description: `💲Цена: ${onePoint}$\n📆 Срок окупаемости: 3 месяца`,
                    photo_id: '-214908815_457239033',
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
                    title: '🍩 Disney',
                    description: `💲Цена: ${twoPoint}$\n📆 Срок окупаемости: 2.5 месяца`,
                    photo_id: '-214908815_457239032',
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
                    title: '⚙ AUDI',
                    description: `💲Цена: ${threePoint}$\n📆 Срок окупаемости: 2 месяца`,
                    photo_id: '-214908815_457239031',
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
                    title: '💡 Tesla',
                    description: `💲Цена: ${fourPoint}$\n📆 Срок окупаемости: 1.5 месяца`,
                    photo_id: '-214908815_457239034',
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
                    title: '🍏 Apple',
                    description: `💲Цена: ${fivePoint}$\n📆 Срок окупаемости: 1.5 месяца`,
                    photo_id: '-214908815_457239035',
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