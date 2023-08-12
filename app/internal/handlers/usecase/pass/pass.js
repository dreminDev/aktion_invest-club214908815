const { pass_photo } = require('../../../../../photo.json');
const { passKeyboard } = require('../../../../pkg/keyboard/inline');

module.exports = async msg => {
    const userId = msg.senderId;

    msg.send(
        `🔱PASS - включает в себя:
- Отключение комиссии при выводе
    
🏷 Ценник божеский: 950₽
    
ℹ Пасс выдается навсегда. Для покупки пополните баланс бота на 950₽ и нажмите «Купить»
Позже список будет дополнятся и если у вас уже куплен пасс то все что будет добавляться в пасс для вас так же будет добавлено.`,
        {
            keyboard: passKeyboard,
            attachment: pass_photo,
        },
    );
};
