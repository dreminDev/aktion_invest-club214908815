const { getReferralData } = require("../../domain/user/service/service");



module.exports = async (msg) => {
    const userId = msg.senderId;

    const { refAmount, referralCount, refLink } = await getReferralData(userId);
    
    msg.send(`👥 Рефералы - твой заработок за приглашения людей!\n\n• За одного реферала ты получишь: ${refAmount}$\n• Ты пригласил: ${referralCount} чел.\n• Твоя ссылка для приглашения: ${refLink}`)
};