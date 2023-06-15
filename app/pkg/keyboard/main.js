const { keyboard, red, green, gray, blue , constructorKeyboard} = require("./help");

const keyboardMain = (admin) => {
    const arr = [
        [
            constructorKeyboard("text", "🌟 Мои Акции", green, "profile"),
        ],
        [
            constructorKeyboard("text", "☄ Купить акции", red, "action"),
            
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