const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");
const { dbPromocode } = require("../../../domain/user/storage/mongo/managers/dbPromocodeManagers");
const { dbPromocodeActivate } = require("../../../domain/user/storage/mongo/managers/dbPromocodesActivationsManagers");

const { vkShort } = require("../../../adapters/vk/vkUtils");

const { Utils } = require("../../../../pkg/utils/utils");
const { handleError } = require("../../../../error/customError");

require("dotenv").config();

async function ActivateHandler(userId, promotext) {
    try {
        const [user, promoInfo] = await Promise.all([
            dbUser.get(userId, {
                vkDonut: 1
            }),
            dbPromocode.get(promotext),
        ]);

        const { vkDonut } = user;

        if (!promoInfo) {
            return;
        };

        if (!vkDonut) {
            throw new Error("missing vkDonut subscription");
        }

        const { promocode_name, promocode_count, promocode_amount } = promoInfo;

        const promoActivateUserInfo = await dbPromocodeActivate.get(userId, promocode_name);

        if (promoActivateUserInfo) {
            return vkShort.sendMsg(userId, "🔄 Ты уже активировал промокод.");
        };

        if (promocode_count <= 0) {
            return vkShort.sendMsg(userId, "🕐 Промокод уже закончился.")
        };

        Promise.all([
            dbPromocode.activate({
                userId: userId,
                name: promocode_name,
                amount: promocode_amount,
            }),

            dbUser.incUserBalance(userId, promocode_amount),

            vkShort.sendMsg(
                userId,
                `🎉 Успешная активация промокода. +${Utils.formateNumberAddition(promocode_amount)}$`
            ),
        ]);
    } catch (error) {
        handleError(error, userId);
    };
};

module.exports = {
    ActivateHandler,
};