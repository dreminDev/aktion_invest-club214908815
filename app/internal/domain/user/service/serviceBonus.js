const { vkShort } = require("../../../adapters/vk/vkUtils");
const { dbUser } = require("../storage/mongo/managers/dbUserManagers");

const {
    newCommentBonusInfo,
    newDailyBonusInfo
} = require("../model/user");
const { Utils } = require("../../../../pkg/utils/utils");



async function getCommentUser(userId, subTypes) {
    const { vkDonut } = await dbUser.get(userId, {
        _id: 0,
        vkDonut: 1,
    });

    const amount = 15;

    if (!vkDonut) {
        throw new Error("missing vkDonut subscription");
    };

    if (subTypes.includes("wall_reply_new")) {
        return dbUser.incUserBalance(userId, amount);
    };

    if (subTypes.includes("wall_reply_delete")) {
        return dbUser.incUserBalance(userId, -amount);
    };

    const data = newCommentBonusInfo({
        "amount": amount,
    });

    return data;
};

async function getBonusDaily(userId) {
    const { lastBonusAt, vkDonut } = await dbUser.get(userId, {
        _id: 0,
        lastBonusAt: 1,
        vkDonut: 1,
    });

    const today = new Date();
    const lastTimeBonus = (today - lastBonusAt);

    if (lastTimeBonus < 86_400_000) {
        throw new Error("the day hasn't passed yet");
    };

    const amount = vkDonut ? Utils.random(40_000, 90_000) : Utils.random(10_000, 30_000);

    dbUser.setDailyBonus(userId, amount);

    const data = newDailyBonusInfo({
        "amount": amount,
    });

    return data;
};

module.exports = {
    getCommentUser,
    getBonusDaily
};