const { dbUser } = require("../storage/mongo/managers/dbUserManagers");

const { 
    newCommentBonusInfo, 
} = require("../model/user");


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

module.exports = {
    getCommentUser,
};