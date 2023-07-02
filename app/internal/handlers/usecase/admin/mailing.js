const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");
const { mailingVeryfeKeyboard } = require("../../../../pkg/keyboard/admin");



module.exports = async (msg) => {
    const userId = msg.senderId;

    const admin = await dbUser.getAdmins();

    if (!admin.includes(userId)) {
        return;
    };

    const userCount = await dbUser.userCount();

    const text = await msg.question(
        `👥 Пользователей собрано: ${userCount}\n\n✏️ Введите текст рассылки:`
    );

    const attachment = await msg.question(
        `👻 Отлично!\n🔥 Отправте attacment, если он не требуется нажмите кнопку.`,
        {
            keyboard: mailingAttachemntKeyboard
        });

    const veryfe = await msg.question(text.text, {
        keyboard: mailingVeryfeKeyboard,
        attachment: attachment.text,
    });

    if (veryfe.text !== 'Запустить') {
        return msg.send('❗️ Рассылка успешно отменена')
    };


    
};