const { getTopsOfPerDayInc } = require("../../../domain/user/service/service");



module.exports = async (msg) => {
    const { text } = await getTopsOfPerDayInc();

    msg.send(text);
};