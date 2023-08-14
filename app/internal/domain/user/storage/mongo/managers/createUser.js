const { User } = require('../../model/user');

const { vkUtils } = require('../../../../../adapters/vk/vkUtils');
const { Utils } = require('../../../../../../pkg/utils/utils');

const { keyboardMain } = require('../../../../../../pkg/keyboard/main');

const log = console.log;

async function createUser(id, referrerId = 0) {
    try {
        User.create({
            id: id,
            referrerId: referrerId,
            admin: process.env.ADMINS_ID.includes(id),
        })
            .then(() => log(`[ ${Utils.getTime()} || NER USER - ${id} ]`))
            .catch(err => log(`ERROR CREATE USER - ${id}`, err));

        vkUtils.msg({
            peerId: id,
            message: `💲Привет. Ты попал в Акционера! Покупай акции, лутай банк и зарабатывай на полном пассиве`,
            keyboard: keyboardMain(process.env.ADMINS_ID.includes(id)),
        });

        if (referrerId && referrerId !== id) {
            const { vkDonut } = await User.findOne({ id: referrerId }, {
                _id: 0,
                vkDonut: 1,
            });

            const refAmount = vkDonut ? 25 : 10;
            const refAmountDollars = vkDonut ? 0.25 * 18_000 : 0.1 * 18_000;

            User.updateOne(
                { id: referrerId },
                { $inc: { referralCount: 1, availableBalance: refAmountDollars } },
            ).then(),
                vkUtils.msg({
                    peerId: referrerId,
                    message: `🙋‍♂ Новый @id${id} (партнер). Вы заработали ${refAmount} копеек`,
                });
        }
    } catch (e) {
        log(e);
    }
}

module.exports = {
    createUser,
};
