const { keyboard, constructorKeyboard, green, red, gray, blue } = require("./help");

require("dotenv").config();

const adminKeyboard = keyboard([
    [
        constructorKeyboard("text", "Рассылка", green, "mailing"),
    ],
    [
        constructorKeyboard("text", "Выдать", gray, "issueBalance"),

        constructorKeyboard("text", "Выдать на вывод", gray, "issueWithDrawl"),

        constructorKeyboard("text", "Пополнить банк", gray, "issueBank"),
    ],
    [
        constructorKeyboard("text", "Создать промокод", blue, "createPromo"),

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