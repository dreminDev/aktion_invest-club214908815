const admin = require("../../../../internal/handlers/usecase/admin/admin");
const issueBalance = require("../../../../internal/handlers/usecase/admin/issueBalance");
const issueBan = require("../../../../internal/handlers/usecase/admin/issueBan");
const issueBank = require("../../../../internal/handlers/usecase/admin/issueBank");
const issueWithdrawl = require("../../../../internal/handlers/usecase/admin/issueWithdrawl");
const bank = require("../../../../internal/handlers/usecase/bank/bank");
const statistics = require("../../../../internal/handlers/usecase/global/statistics");
const profile = require("../../../../internal/handlers/usecase/profile");
const buyPoint = require("../../../../internal/handlers/usecase/purchases/buyPoint");
const templatePoint = require("../../../../internal/handlers/usecase/purchases/templatePoint");
const referrals = require("../../../../internal/handlers/usecase/referrals");
const setQiwiNumber = require("../../../../internal/handlers/usecase/setQiwiNumber");
const statusVkDonut = require("../../../../internal/handlers/usecase/statusVkDonut");
const topsOfIncome = require("../../../../internal/handlers/usecase/tops/topsOfIncome");
const topsOfReferals = require("../../../../internal/handlers/usecase/tops/topsOfReferals");
const walletTemplate = require("../../../../internal/handlers/usecase/wallet/walletTemplate");
const withdrawalQiwi = require("../../../../internal/handlers/usecase/wallet/withdrawalQiwi");



function initUserHandlers(addCommand) {
    if (typeof addCommand !== 'function') {
        throw new Error("invalid init user handlers arguments");
    };

    addCommand("profile", "text", profile);
    addCommand("changeQiwiPhoneNumber", "text", setQiwiNumber);

    addCommand("action", "text", templatePoint);
    addCommand("point.buy", "event", buyPoint);

    addCommand("referrals", "text", referrals);
    addCommand("statusVkDonut", "text", statusVkDonut);

    addCommand("statistics", "text", statistics);

    addCommand("topsIncome", "text", topsOfIncome);
    addCommand("topsReferrals", "text", topsOfReferals);

    addCommand("bank", "text", bank);

    addCommand("wallet", "text", walletTemplate);

    addCommand("output.qiwi", "event", withdrawalQiwi);

    addCommand("admin", "event", admin);
    addCommand("ban&razban", "text", issueBan);
    addCommand("issueBalance", "text", issueBalance);
    addCommand("issueBank", "text", issueBank);
    addCommand("issueWithDrawl", "text", issueWithdrawl);
};

module.exports = {
    initUserHandlers,
};