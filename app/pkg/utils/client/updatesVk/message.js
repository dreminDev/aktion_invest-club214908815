const { updates } = require("../../../../internal/adapters/vk/vk");
const { dbUser } = require("../../../../internal/domain/user/storage/mongo/managers/dbUserManagers");
const { executeCommand } = require("../commandManagers/executeCommand");

const { keyboardMain } = require("../../../keyboard/main");

function updatesMessage() {
    updates.on('message_new', async (msg) => {
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

        if (['меню', 'начать'].includes(msg.text.toLowerCase()) ) {
			return msg.send('меню', {
				keyboard: keyboardMain(user.admin),
	    	});
        };

        executeCommand(msg);
    });
};

module.exports = {
    updatesMessage,
};