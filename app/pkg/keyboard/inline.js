const { keyboard, constructorKeyboard, green, red, gray, blue } = require("./help");

const profileKeyboard = keyboard([
    [
        constructorKeyboard("text", "🥝 Изменить QIWI", gray, "changeQiwiPhoneNumber"),
    ]
]).inline();

module.exports = {
    profileKeyboard,
};