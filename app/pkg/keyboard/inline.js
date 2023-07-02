const { keyboard, constructorKeyboard, green, red, gray, blue } = require("./help");

require("dotenv").config();

const profileKeyboard = keyboard([
    [
        constructorKeyboard("text", "🥝 Изменить QIWI", gray, "changeQiwiPhoneNumber"),
    ],
    [
        constructorKeyboard("text", "🕛 Ежедневный бонус", blue, "dailyBonus")
    ]
]).inline();

const statusVkDonutKeyboard = keyboard([
    [
        constructorKeyboard("url", "🔗 Купить", "", "", `https://vk.com/donut/club${process.env.GROUP_ID}`),
    ]
]).inline();

const topsKeyboard = keyboard([
    [
        constructorKeyboard("text", "💰 Топ по доходу", gray, "topsIncome"),
    ],
    [
        constructorKeyboard("text", "👥 Топ по рефералам", gray, "topsReferrals"),
    ]
]).inline();

const bankKeyboard = (vkDonut) => {
    const arr = [];

    if (!vkDonut) {
        arr.push([
            constructorKeyboard("url", "🔗 Купить", "", "", `https://vk.com/donut/club${process.env.GROUP_ID}`),
        ]);
    } else {
        arr.push([
            constructorKeyboard("event", "🍩 Вывести", green, "output.bank"),
        ]);
    };

    return keyboard(arr).inline();
};

module.exports = {
    profileKeyboard,
    statusVkDonutKeyboard,
    topsKeyboard,
    bankKeyboard,
};