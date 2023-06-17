const profile = require("../../../../internal/handlers/usecase/profile");
const buyPoint = require("../../../../internal/handlers/usecase/purchases/buyPoint");
const templatePoint = require("../../../../internal/handlers/usecase/purchases/templatePoint");
const referrals = require("../../../../internal/handlers/usecase/referrals");
const setQiwiNumber = require("../../../../internal/handlers/usecase/setQiwiNumber");
const statusVkDonut = require("../../../../internal/handlers/usecase/statusVkDonut");



function initUserHandlers(addCommand) {
    if (typeof addCommand !== 'function') {
        throw new Error("invalid init user handlers arguments")
    };

    addCommand("profile", "text", profile);
    addCommand("changeQiwiPhoneNumber", "text", setQiwiNumber);

    addCommand("action", "text", templatePoint);
    addCommand("point.buy", "event", buyPoint);

    addCommand("referrals", "text", referrals);
    addCommand("statusVkDonut", "text", statusVkDonut);
    
};

module.exports = {
    initUserHandlers,
};