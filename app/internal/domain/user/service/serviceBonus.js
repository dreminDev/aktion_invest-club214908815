require("dotenv").config();

const { dbUser } = require("../storage/mongo/managers/dbUserManagers");

const { dbGlobal } = require("../storage/mongo/managers/dbGlobalManagers");
const { dbLike } = require("../storage/mongo/managers/like");

const dailyBonuses = require("../../../../../dailyBonuses.json");
const amountBonuses = require("../../../../../amountBonuses.json");

const {
  newCommentBonusInfo,
  newDailyBonusInfo,
  newUserLikePost,
  newLastPostIdInfo,
} = require("../model/user");

const donutChargePercent = process.env?.ADDITIONAL_DONUT_CHARGE_PERCENT || 10;

const chargedDonutAward = (award, percent) => {
  return award + (award * (percent / 100))
};

const dailyAward = (day, isVkDonut) => {
  const bonus = dailyBonuses?.[day]

  if (!bonus) {
    return {
      award: 10_000,
      photo: ""
    }
  }

  return {
    award: isVkDonut ? chargedDonutAward(bonus.award, donutChargePercent) : bonus.award,
    photo: isVkDonut ? bonus.donut_photo : bonus.photo,
  }
};

async function getCommentUser(userId, subTypes) {
  const { vkDonut } = await dbUser.get(userId, {
    _id: 0,
    vkDonut: 1,
  });

  const amount = 15;

  if (!vkDonut) {
    throw new Error("missing vkDonut subscription comment");
  };

  if (subTypes.includes("wall_reply_new")) {
    dbUser.incUserBalance(userId, amount);
  };

  if (subTypes.includes("wall_reply_delete")) {
    dbUser.incUserBalance(userId, -amount);
  };

  const data = newCommentBonusInfo({
    "amount": amount,
  });

  return data;
};

async function getBonusDaily(userId, isNeedToTake) {
  const user = await dbUser.get(userId, {
    _id: 0,
    lastBonusAt: 1,
    vkDonut: 1,
    bonusDay: 1,
  });

  const { lastBonusAt, vkDonut } = user
  let { bonusDay } = user

  const today = new Date();
  const lastTimeBonus = (today - lastBonusAt);

  if (lastTimeBonus < 86_400_000) {
    throw new Error("the day hasn't passed yet");
  };

  if ((lastTimeBonus / 86_400_000 >= 2 && bonusDay > 1) || bonusDay === 7) {
    await dbUser.updateBonusDay(userId, 1);

    bonusDay = 1
  } else if (isNeedToTake) {
    await dbUser.updateBonusDay(userId, bonusDay + 1)
  };

  const awardInfo = dailyAward(bonusDay, vkDonut)

  const data = newDailyBonusInfo(awardInfo);

  if (!isNeedToTake) {
    return data
  };

  await dbUser.setDailyBonus(userId, awardInfo.award);

  return data;
};

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
  };

  switch (likeData) {
    case null:
      Promise.all([
        dbLike.add(userId, postId, amountBonuses.like),
        dbUser.incUserBalance(userId, amountBonuses.like),
      ]);
      break;
    default:
      throw new Error("have you already liked");
  };

  const data = newUserLikePost({
    "amount": amountBonuses.like,
  });

  return data;
};

async function getUpdateLastPostId(postId) {
  await dbGlobal.setLikePost(postId);

  const data = newLastPostIdInfo({
    "postId": postId,
  });

  return data;
};


module.exports = {
  getCommentUser,
  getBonusDaily,
  getLikeUser,
  getUpdateLastPostId,
};