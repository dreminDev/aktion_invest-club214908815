const { updates } = require("../../../../../internal/adapters/vk/vk");
const { dbUser } = require("../../../../../internal/domain/user/storage/mongo/managers/dbUserManagers");

const { executeCommand } = require("../commandManagers/executeCommand");
const { ActivateHandler } = require("../../../../../internal/handlers/usecase/promocode/activate");

const { keyboardMain } = require("../../../../keyboard/main");



function updatesMessage() {
    updates.on('message_new', async (msg) => {
        try {

            const userId = msg.senderId;

            if (msg.isChat) {
                return;
            };

            const user = await dbUser.get(userId, { _id: 0, id: 1, ban: 1, admin: 1 });

            if (!user) {
                return dbUser.add({ id: userId, referrerId: msg.referralValue })
            };

            if (user.ban) {
                return;
            };

            if (['меню', 'начать'].includes(msg.text.toLowerCase())) {
                return msg.send('🧿 Главное меню:', {
                    keyboard: keyboardMain(user.admin),
                });
            };

            const command = executeCommand(msg);

            if (command.executeCommand === "I'm sending it to promo codes for verification.") {
                return ActivateHandler(userId, msg.text);
            };
        } catch (error) {
        }
    });
};

module.exports = {
    updatesMessage,
};