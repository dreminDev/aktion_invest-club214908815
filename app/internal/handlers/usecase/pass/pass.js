const { pass_photo } = require("../../../../../photo.json");
const { passKeyboard } = require("../../../../pkg/keyboard/inline");

module.exports = async msg => {
    const userId = msg.senderId;

    msg.send(`🔱PASS - включает в себя:\n- Отключение комиссии при выводе\n\nℹ Позже список будет дополнятся и если у вас уже куплен пасс то все что будет добавляться в пасс для вас так же будет добавлено.`, 
    {
        keyboard: passKeyboard,
        attachment: pass_photo
    })
};