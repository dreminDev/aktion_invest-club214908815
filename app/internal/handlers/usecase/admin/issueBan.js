const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");
const { vkUtils } = require("../../../adapters/vk/vkUtils");

const { handleError } = require("../../../../error/customError");



module.exports = async (msg) => {
    try {
        const userIds = msg.userId || msg.senderId;

        const admin = await dbUser.getAdmins();

        if (!admin.includes(userIds)) {
            return;
        };

        const user = await msg.question(
            "📝 Отправь мне ссылку на пользователя."
        );

        const userId = await vkUtils.getId(user.text);

        const answer = await msg.question(
            "✏️ Отправь ссылку\n\n✅ Бан: 1\n❌ Разбан: 0",
        );

        const type = Number(answer.text) ? true : false;
        const typeText = Number(answer.text) ? "ЗАБАНЕН" : "РАЗБАНЕН";

        Promise.all([
            dbUser.banType(userId, type),
            msg.send(`✅ Успешно, @id${userId} (пользователь) был ${typeText}`),
        ]);

    } catch (error) {
        handleError(error, msg);
    }
};