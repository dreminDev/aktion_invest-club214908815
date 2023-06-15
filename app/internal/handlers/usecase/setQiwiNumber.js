const { setQiwiNumberForUser } = require("../../domain/user/service/service");
const { handleError } = require("../../../pkg/utils/error/customError");



module.exports = async (msg) => {
    try {
        const userId = msg.senderId;

        const qiwiNumberInput = await msg.question(
            '📝 Введите ваш номер QIWI в формате: +X'
        );

        const qiwiNumber = qiwiNumberInput.text;

        const data = await setQiwiNumberForUser(userId, qiwiNumber);
        
        msg.send(`✅ Новый номер успешно установлен!\n\n🥝 Ваш QIWI: ${data.qiwiNumber}`);
    } catch (err) {
        handleError(err, msg);
    };
};