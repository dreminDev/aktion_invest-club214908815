const { keyboard, constructorKeyboard, green, red, gray, blue } = require("./help");

require("dotenv").config();

const profileKeyboard = keyboard([
    [
        constructorKeyboard("text", "🥝 Изменить QIWI", gray, "changeQiwiPhoneNumber"),
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

module.exports = {
    profileKeyboard,
    statusVkDonutKeyboard,
    topsKeyboard
};