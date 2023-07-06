const { handleError } = require('../../../../error/customError')
const { getBonusDaily } = require('../../../domain/user/service/serviceBonus')

const { Utils } = require('../../../../pkg/utils/utils')
const { dailyBonusTake } = require('../../../../pkg/keyboard/inline')

const dailyBonusInfo = async (msg) => {
  try {
    const userId = msg.senderId

    const output = await getBonusDaily(userId, false)

    msg.send(`🎉 Твой бонус на сегодня:`, {
      attachment: output.photo,
      keyboard: dailyBonusTake
    })
  } catch (error) {
    handleError(error, msg)
  }
}

const takeDailyBonus = async (msg) => {
  try {
    const userId = msg.senderId

    const output = await getBonusDaily(userId, true)

    msg.send("💲 Бонус за сегодня начислен на баланс для покупок")
  } catch (error) {
    handleError(error, msg)
  }
}

module.exports = {
  takeDailyBonus, 
  dailyBonusInfo
}
