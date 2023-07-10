const admin = require("../../../../../internal/handlers/usecase/admin/admin");
const createPromo = require("../../../../../internal/handlers/usecase/admin/createPromo");
const issueBalance = require("../../../../../internal/handlers/usecase/admin/issueBalance");
const issueBan = require("../../../../../internal/handlers/usecase/admin/issueBan");
const issueBank = require("../../../../../internal/handlers/usecase/admin/issueBank");
const issueWithdrawlGlobal = require("../../../../../internal/handlers/usecase/admin/issueWithdrawlGlobal");
const issueWithdrawlUser = require("../../../../../internal/handlers/usecase/admin/issueWithdrawlUser");
const mailing = require("../../../../../internal/handlers/usecase/admin/mailing");
const bank = require("../../../../../internal/handlers/usecase/bank/bank");
const bankWithdrawal = require("../../../../../internal/handlers/usecase/bank/bankWithdrawal");
const { dailyBonusInfo, takeDailyBonus } = require("../../../../../internal/handlers/usecase/bonus/dayilyBonus");
const statistics = require("../../../../../internal/handlers/usecase/global/statistics");
const profile = require("../../../../../internal/handlers/usecase/profile");
const buyPoint = require("../../../../../internal/handlers/usecase/purchases/buyPoint");
const templatePoint = require("../../../../../internal/handlers/usecase/purchases/templatePoint");
const referrals = require("../../../../../internal/handlers/usecase/referrals");
const setQiwiNumber = require("../../../../../internal/handlers/usecase/setQiwiNumber");
const tax = require("../../../../../internal/handlers/usecase/tax/tax");
const taxPayment = require("../../../../../internal/handlers/usecase/tax/taxPayment");
const withdraw = require("../../../../../internal/handlers/usecase/tax/withdraw");
const topsOfIncome = require("../../../../../internal/handlers/usecase/tops/topsOfIncome");
const topsOfReferals = require("../../../../../internal/handlers/usecase/tops/topsOfReferals");
const walletTemplate = require("../../../../../internal/handlers/usecase/wallet/walletTemplate");
const withdrawalQiwi = require("../../../../../internal/handlers/usecase/wallet/withdrawalQiwi");



function initUserHandlers(addCommand) {
    if (typeof addCommand !== 'function') {
        throw new Error("invalid init user handlers arguments");
    };

    addCommand("profile", "text", profile);
    addCommand("changeQiwiPhoneNumber", "text", setQiwiNumber);
    addCommand("action", "text", templatePoint);
    addCommand("point.buy", "event", buyPoint);
    addCommand("referrals", "text", referrals);
    addCommand("statistics", "text", statistics);

    addCommand("topsIncome", "text", topsOfIncome);
    addCommand("topsReferrals", "text", topsOfReferals);

    addCommand("bank", "text", bank);
    addCommand("output.bank", "text", bankWithdrawal);

    addCommand("wallet", "text", walletTemplate);

    addCommand("tax", "text", tax);
    addCommand("taxPayment", "text", taxPayment);

    addCommand("output.qiwi", "event", withdrawalQiwi);

    addCommand("dailyBonus", "text", dailyBonusInfo);
    addCommand("takeDailyBonus", "text", takeDailyBonus);

    addCommand("taxWithdrawPayment", "text", withdraw);

    addCommand("admin", "event", admin);
    addCommand("ban&razban", "text", issueBan);
    addCommand("issueBalance", "text", issueBalance);
    addCommand("issueBank", "text", issueBank);
    addCommand("issueWithDrawl", "text", issueWithdrawlUser);
    addCommand("mailing", "text", mailing);
    addCommand("createPromo", "text", createPromo);
    addCommand("issueWithdrawlGlobal", "text", issueWithdrawlGlobal);
};

module.exports = {
    initUserHandlers,
};