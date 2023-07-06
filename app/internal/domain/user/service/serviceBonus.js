const { vkShort } = require("../../../adapters/vk/vkUtils");
const { dbUser } = require("../storage/mongo/managers/dbUserManagers");

const {
    newCommentBonusInfo,
    newDailyBonusInfo
} = require("../model/user");
const { Utils } = require("../../../../pkg/utils/utils");

const dailyBonuses = require("../../../../../dailyBonuses.json")

const donutChargePercent = process.env?.ADDITIONAL_DONUT_CHARGE_PERCENT || 10

const chargedDonutAward = (award, percent) => {
  return award + (award * (percent / 100))
}

const dailyAward = (day, isVkDonut) => {
  const bonus = dailyBonuses?.[day]
  console.log(bonus)
  if (!bonus) {
    return {
      award: 10_000,
      photo: ""
    }
  }

  return {
    award: isVkDonut ? chargedDonutAward(bonus.award, donutChargePercent) : bonus.award,
    photo: isVkDonut ? bonus.donut_photo : bonus.photo
  }
}

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

    console.debug(lastTimeBonus / 86_400_000, 'bonus in days')

    console.log(bonusDay)

    if ((lastTimeBonus / 86_400_000 >= 2 && bonusDay > 1) || bonusDay === 7) {
      await dbUser.updateBonusDay(userId, 1)

      bonusDay = 1 
    } else if (isNeedToTake) {
      await dbUser.updateBonusDay(userId, bonusDay + 1)
    }

    const awardInfo = dailyAward(bonusDay, vkDonut)

    const data = newDailyBonusInfo(awardInfo);

    if (!isNeedToTake) {
      return data 
    }

    await dbUser.setDailyBonus(userId, awardInfo.award);

    return data;
};

module.exports = {
    getCommentUser,
    getBonusDaily
};