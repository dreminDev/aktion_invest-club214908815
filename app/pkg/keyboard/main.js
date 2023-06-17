const { keyboard, red, green, gray, blue , constructorKeyboard} = require("./help");

const keyboardMain = (admin) => {
    const arr = [
        [
            constructorKeyboard("text", "🌟 Мои Акции", green, "profile"),
        ],
        [
            constructorKeyboard("text", "☄ Купить акции", red, "action"),

            constructorKeyboard("text", "🔥 Статус", green, "statusVkDonut"),
        ],
        [
            constructorKeyboard("text", "⚡️ Рефералы", green, "referrals"),
        ],
];

    if (admin) {
        arr.push([ 
            constructorKeyboard("text", "Админ-панель", red, "admin"),
        ]);
    };

    return keyboard(arr);
};

module.exports = {
    keyboardMain,
};