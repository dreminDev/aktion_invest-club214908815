const { getProfileData } = require('../../domain/user/service/service');
const { profileKeyboard } = require('../../../pkg/keyboard/inline');

module.exports = async msg => {
    const userId = msg.senderId;

    const { status, balance, refCount, perDayInc, qiwiNumber, availableBalance, passStatus } =
        await getProfileData(userId);

    msg.send(`⚙ Профиль:\n🍩 Статус « ${status} »\n🔱 PASS: ${passStatus}\n\n🏦 Состояние:\n💰 Баланс для покупок: ${balance}$\n💵 Баланс для вывода: ${availableBalance}₽ из 230₽\n\n☀ Суточный доход: ${perDayInc}$\n\n☎ Номер: ${qiwiNumber}\n👥 Рефералов: ${refCount} чел.`,
        {
            keyboard: profileKeyboard,
        },
    );
};
