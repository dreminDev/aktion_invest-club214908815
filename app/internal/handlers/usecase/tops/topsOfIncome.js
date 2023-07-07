const { getTopsOfPerDayInc } = require("../../../domain/user/service/service");
const { handleError } = require("../../../../error/customError");


module.exports = async (msg) => {
    try {
        const { text } = await getTopsOfPerDayInc();

        msg.send(text);

    } catch (error) {
        handleError(error, msg);
    };
};