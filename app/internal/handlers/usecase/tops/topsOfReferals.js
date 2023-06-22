const { getTopOfReferralsData } = require("../../../domain/user/service/service");

module.exports = async (msg) => {
    const { text } = await getTopOfReferralsData();

    msg.send(text);
};