const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");
const { vkUtils, vkShort } = require("../../../adapters/vk/vkUtils");
const { adminKeyboard } = require("../../../../pkg/keyboard/admin");



module.exports = async (msg) => {
    const userId = msg.userId ? msg.userId : msg.senderId;

    const admin = await dbUser.getAdmins();

    if (!admin.includes(userId)) {
        return;
    };

    Promise.all([
        vkUtils.msg({
            peerId: userId,
            message: `Админ панель:`,
            keyboard: adminKeyboard,
        }),
        vkShort.sendAnswer(msg),
    ]);

};