const { getMailingAdmin } = require("../../../domain/user/service/serviceAdmin");

const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");
const { mailingVeryfeKeyboard, mailingAttachemntKeyboard } = require("../../../../pkg/keyboard/admin");



module.exports = async (msg) => {
    try {

        const userId = msg.senderId;

        const admin = await dbUser.getAdmins();

        if (!admin.includes(userId)) {
            return;
        };

        const userCount = await dbUser.userCount();

        const textAnswer = await msg.question(
            `👥 Пользователей собрано: ${userCount}\n\n✏️ Введите текст рассылки:`
        );

        const attachmentAnswer = await msg.question(
            `👻 Отлично!\n🔥 Отправте attacment, если он не требуется нажмите кнопку.`,
            {
                keyboard: mailingAttachemntKeyboard
            });

        const veryfe = await msg.question(textAnswer.text, {
            keyboard: mailingVeryfeKeyboard,
            attachment: attachmentAnswer.text,
        });

        if (veryfe.text !== 'Запустить') {
            return msg.send('❗️ Рассылка успешно отменена')
        };

        const text = textAnswer.text;
        const attachment = attachmentAnswer.text;

        msg.send('✅ Рассылка успешно заупещена');

        const { countMsg, timeEnd } = await getMailingAdmin(text, attachment, userCount / 100);

        msg.send(`📊 Статистика по рассылке:\n\n⏲ Рассылка разослана за: ${timeEnd} мс.\n💭 Отправлено: ${countMsg} сообщений.`);
    } catch {};
};