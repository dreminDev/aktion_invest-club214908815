const { vkUtils } = require("../../../adapters/vk/vkUtils");
const { dbUser } = require("../storage/mongo/managers/dbUserManagers");

const { 
    newMailingInfo 
} = require("../model/user");
const { Utils } = require("../../../../pkg/utils/utils");


async function getMailingAdmin(text, attachment, countUsers) {
    let offset = 0;

    const startTimeDialogs = Date.now();

    for (let i = 0; i < countUsers; i++) {
        const mailingUser = await dbUser.getUserMailingFind(offset);

        const userIds = mailingUser.map(x => x.id);

        const ids = userIds.join(',');

        offset += 100;

        await Utils.sleep(100);

        vkUtils.msg({
            peerId: ids,
            message: text,
            attachment: attachment,
        });
    };

    const data = newMailingInfo({
        "countMsg": countUsers * 100,
        "timeEnd": (Date.now() - startTimeDialogs) / 1_000,
    });

    return data;

};

module.exports = {
    getMailingAdmin,
};