const { keyboard, constructorKeyboard, green, red, gray, blue } = require("./help");

require("dotenv").config();

const profileKeyboard = keyboard([
    [
        constructorKeyboard("text", "🥝 Изменить QIWI", gray, "changeQiwiPhoneNumber"),
    ]
]).inline();

const dailyBonusTake = keyboard([
  [
    constructorKeyboard("text", "Забрать", green, "takeDailyBonus")
  ]
]).inline()

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

const taxPaymentKeyboard = keyboard([
    [
        constructorKeyboard("event", "💲 Оплатить", green, "taxPayment"),  
    ]
]).inline();

const taxPaymentWithdrawKeyboard = keyboard([
    [
        constructorKeyboard("text", "💲 Оплатить", green, "taxWithdrawPayment"),  
    ]
]).inline();


module.exports = {
    profileKeyboard,
    topsKeyboard,
    bankKeyboard,
    taxPaymentKeyboard,
    dailyBonusTake,
    taxPaymentWithdrawKeyboard,
};