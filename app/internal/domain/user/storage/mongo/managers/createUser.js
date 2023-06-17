const { User } = require("../../model/user");
const { dbGlobal } = require("./dbGlobalManagers");

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
            message: `💲Привет. Ты попал в Акционера! Покупай акции, лутай банк и зарабатывай на полном пассиве`,
            keyboard: keyboardMain(process.env.ADMINS_ID.includes(id))
        });

        if (referrerId && referrerId !== id) {
            const { refAmount } = await dbGlobal.get({
                _id: 0,
                refAmount: 1,
            });

            const amount = Utils.formateNumberAddition(refAmount);

            User.updateOne({ id: referrerId }, { $inc: { referralCount: 1, balance: amount } }).then(),

            vkUtils.msg({
                peerId: referrerId,
                message: `👥 У тебя новый @id${id} (реферал), зачисление +${amount}$`,
            });
        };

    } catch (e) {
        console.log(e);
    };
};

module.exports = {
    createUser,
};