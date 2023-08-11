require('dotenv').config();

const { dbUser } = require('../storage/mongo/managers/dbUserManagers');

const { dbGlobal } = require('../storage/mongo/managers/dbGlobalManagers');
const { dbLike } = require('../storage/mongo/managers/like');

const dailyBonuses = require('../../../../../dailyBonuses.json');
const amountBonuses = require('../../../../../amountBonuses.json');

const {
    newCommentBonusInfo,
    newDailyBonusInfo,
    newUserLikePost,
    newLastPostIdInfo,
    newSubGroupBonus,
} = require('../model/user');

const donutChargePercent = process.env?.ADDITIONAL_DONUT_CHARGE_PERCENT || 10;

const chargedDonutAward = (award, percent) => {
    return award + award * (percent / 100);
};

const dailyAward = (day, isVkDonut) => {
    const bonus = dailyBonuses?.[day];

    if (!bonus) {
        return {
            award: 10_000,
            photo: '',
        };
    }

    return {
        award: isVkDonut ? chargedDonutAward(bonus.award, donutChargePercent) : bonus.award,
        photo: isVkDonut ? bonus.donut_photo : bonus.photo,
    };
};

async function getCommentUser(userId, subTypes) {
    const { vkDonut } = await dbUser.get(userId, {
        _id: 0,
        vkDonut: 1,
    });

    if (!vkDonut) {
        throw new Error('missing vkDonut subscription comment');
    }

    if (subTypes.includes('wall_reply_new')) {
        dbUser.incUserBalance(userId, amountBonuses.comment);
    }

    if (subTypes.includes('wall_reply_delete')) {
        dbUser.incUserBalance(userId, -amountBonuses.comment);
    }

    const data = newCommentBonusInfo({
        amount: amountBonuses.comment,
    });

    return data;
}

async function getBonusDaily(userId, isNeedToTake) {
    const user = await dbUser.get(userId, {
        _id: 0,
        lastBonusAt: 1,
        vkDonut: 1,
        bonusDay: 1,
    });

    const { lastBonusAt, vkDonut } = user;
    let { bonusDay } = user;

    const today = new Date();
    const lastTimeBonus = today - lastBonusAt;

    if (lastTimeBonus < 86_400_000) {
        throw new Error("the day hasn't passed yet");
    }

    if ((lastTimeBonus / 86_400_000 >= 2 && bonusDay > 1) || bonusDay === 7) {
        await dbUser.updateBonusDay(userId, 1);

        bonusDay = 1;
    } else if (isNeedToTake) {
        await dbUser.updateBonusDay(userId, bonusDay + 1);
    }

    const awardInfo = dailyAward(bonusDay, vkDonut);

    const data = newDailyBonusInfo(awardInfo);

    if (!isNeedToTake) {
        return data;
    }

    await dbUser.setDailyBonus(userId, awardInfo.award);

    return data;
}

async function getLikeUser(userId, postId) {
    const [likeData, global] = await Promise.all([
        dbLike.get(userId, postId, {
            _id: 1,
        }),
        dbGlobal.get({
            _id: 0,
            likePost: 1,
        }),
    ]);

    const { likePost } = global;

    if (postId !== likePost) {
        return;
    }

    switch (likeData) {
        case null:
            Promise.all([
                dbLike.add(userId, postId, amountBonuses.like),
                dbUser.incUserBalance(userId, amountBonuses.like),
            ]);
            break;
        default:
            throw new Error('have you already liked');
    }

    const data = newUserLikePost({
        amount: amountBonuses.like,
    });

    return data;
}

async function getUpdateLastPostId(postId) {
    await dbGlobal.setLikePost(postId);

    const data = newLastPostIdInfo({
        postId: postId,
    });

    return data;
}

async function getSubscribed(userId, subTypes) {
    const [user] = await Promise.all([
        dbUser.get(userId, {
            _id: 0,
            isSub: 1,
            perDayInc: 1,
        }),
    ]);

    const { isSub, perDayInc } = user;
    const amount = 20_000;

    let type = 0;

    if (!isSub && subTypes.includes('group_leave')) {
        await dbUser.subStatus(userId, true);
    } else if (isSub && subTypes.includes('group_leave')) {
        await Promise.all([
            dbUser.incBuyPoint({ userId: userId, amount: 0, perDayInc: -amount }),
            dbUser.subStatus(userId, true),
        ]);

        type += 1;
    } else if (subTypes.includes('group_join')) {
        await Promise.all([
            dbUser.incBuyPoint({ userId: userId, amount: 0, perDayInc: amount }),
            dbUser.subStatus(userId, true),
        ]);

        if (!perDayInc) {
            await dbUser.taxNow(userId);
        }

        type += 2;
    }

    const data = newSubGroupBonus({
        amount: amount,
        type: type,
    });

    return data;
}

module.exports = {
    getCommentUser,
    getBonusDaily,
    getLikeUser,
    getUpdateLastPostId,
    getSubscribed,
};
