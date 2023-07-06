const { keyboard, constructorKeyboard, green, red, gray, blue } = require("./help");

require("dotenv").config();

const adminKeyboard = keyboard([
    [
        constructorKeyboard("text", "Рассылка", green, "mailing"),
    ],
    [
        constructorKeyboard("text", "Выдать", blue, "issueBalance"),

        constructorKeyboard("text", "Выдать на вывод", blue, "issueWithDrawl"),
    ],
    [
        constructorKeyboard("text", "Создать промокод", green, "createPromo"),
    ],
    [
        constructorKeyboard("text", "Пополнить банк", blue, "issueBank"),

        constructorKeyboard("text", "Пополнить вывод", red, "issueWithdrawlGlobal"),
    ],
    [
        constructorKeyboard("text", "Бан/разбан", blue, "ban&razban"),
    ]
]).inline();

const mailingAttachemntKeyboard = keyboard([
    [
        constructorKeyboard("text", "Не нужен", red),
    ]
]).inline();


const mailingVeryfeKeyboard = keyboard([
    [
        constructorKeyboard("text", "Запустить", green),
    ],
    [
        constructorKeyboard("text", "Отмена", red),
    ]
]).inline();

module.exports = {
    adminKeyboard,
    mailingAttachemntKeyboard,
    mailingVeryfeKeyboard
};