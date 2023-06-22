const { topsKeyboard } = require("../../../../pkg/keyboard/inline");
const { getStatisticsData } = require("../../../domain/user/service/service");



module.exports = async (msg) => {
    const { userCount, userRefCount, outputTotal } = await getStatisticsData();

    msg.send(`💉 Наша статистика:

😎 Выводим с: 01.06.2023
😶 Всего игроков: ${userCount} чел.
🗺 Всего рефералов: ${userRefCount} чел.

🤠 Вывели: ${outputTotal}₽`, {
        keyboard: topsKeyboard,
    });
};