const { User } = require("../../model/user");
const { Global } = require("../../model/global");

const { vkUtils } = require("../../../../../adapters/vk/vkUtils");
const { Utils } = require("../../../../../../pkg/utils/utils");

const { keyboardMain } = require("../../../../../../pkg/keyboard/main");

const log = console.log;

async function createUser(id, referrerId = 0) {
    try {
        User.create({
            id: id,
            referrerId: referrerId,
            admin: (process.env.ADMINS_ID).includes(id),
        })
            .then(() => log(`[ ${Utils.getTime()} || NER USER - ${id} ]`))
            .catch((err) => log(`ERROR CREATE USER - ${id}`, err));

        vkUtils.msg({
            peerId: id,
            message: `Добрый день`,
            keyboard: keyboardMain(process.env.ADMINS_ID.includes(id))
        });

        if (referrerId && referrerId !== id) {
            vkUtils.msg({
                peerId: referrerId,
                message: `👥 У вас новый @id${id} (реферал)!\nТеперь вы будете получать ${process.env.REF_DEPOSIT_PERCENT}% от депов рефералов.`
            })
        };

    } catch (e) {
        console.log(e);
    };
};

module.exports = {
    createUser,
};