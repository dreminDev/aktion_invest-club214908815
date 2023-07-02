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

            constructorKeyboard("text", "📜 Состояние", blue, "wallet"),
        ],
        [
            constructorKeyboard("text", "🫰 Налоги", blue, "tax"),

            constructorKeyboard("text", "🏦 Банк", blue, "bank"),
        ],
        [
            constructorKeyboard("text", "📊 О боте", green, "statistics"),
        ],
];

    if (admin) {
        arr.push([ 
            constructorKeyboard("event", "Админ-панель", red, "admin"),
        ]);
    };

    return keyboard(arr);
};

module.exports = {
    keyboardMain,
};