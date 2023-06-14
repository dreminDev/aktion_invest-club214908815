const { keyboard, textButton, red, green, gray, blue } = require("./help");

const keyboardMain = (admin) => {
    const arr = [
        [
            
        ]
];

    if (admin) {
        arr.push([ 
            textButton({ label: "Админ-панель", color: red, payload: { "command": "admin" } })
        ]);
    };

    return keyboard(arr);
};

module.exports = {
    keyboardMain,
};