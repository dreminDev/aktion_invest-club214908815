const { parseNumber, isValidPhoneNumber } = require('libphonenumber-js');

const { vkUtils, vkShort } = require('../../../adapters/vk/vkUtils');

const { dbUser } = require("../storage/mongo/managers/dbUserManagers");
const { dbGlobal } = require('../storage/mongo/managers/dbGlobalManagers');

const { Utils } = require("../../../../pkg/utils/utils");
const { amountAction, perDayIncAction } = require("../../../handlers/usecase/purchases/amount.json");

const {
    newProfileInfo,
    newQiwiNumberInfo,
    newBuyPointInfo,
    newReferralInfo,
    newStatisticsInfo,
    newTopsOfReferrals,
    newTopsOfDayIncInfo,
    newWalletTemplateInfo,
    newKeksikDepositInfo,
    newPaymentKeksikQiwiInfo,
    newVkDonutInfo,
    newMailingInfo,
    newBankWithdrawlInfo,
} = require("../model/user");
const { keksikUtils } = require('../../../adapters/keksik/keksikUtils');



async function getProfileData(userId) {
    const [user, global] = await Promise.all([
        dbUser.get(userId, {
            vkDonut: 1,
            balance: 1,
            referralCount: 1,
            perDayInc: 1,
            qiwiNumber: 1,
            availableBalance: 1,
        }),

        dbGlobal.get({
            _id: 0,
            courseOutput: 1,
        }),
    ]);

    const { vkDonut, balance, referralCount, perDayInc, qiwiNumber, availableBalance } = user;
    const { courseOutput } = global;

    const status = vkDonut ? 'Акционер' : 'Обычный';

    const userBalance = Utils.formateNumberAddition(balance);
    const userRefCount = Utils.formateNumberAddition(referralCount);
    const userPerDayInc = Utils.formateNumberAddition(perDayInc);
    const userQiwiNumber = qiwiNumber ? qiwiNumber : '❗️ не указан';
    const userAvailableBalance = Utils.formateNumberAddition(availableBalance / courseOutput);

    const data = newProfileInfo({
        "status": status,
        "balance": userBalance,
        "refCount": userRefCount,
        "perDayInc": userPerDayInc,
        "qiwiNumber": userQiwiNumber,
        "availableBalance": userAvailableBalance,
    });

    return data;
};

async function setQiwiNumberForUser(userId, qiwiNumber) {
    const phoneNumber = await parseNumber(qiwiNumber);

    let validationNumber;

    try {
        validationNumber = await isValidPhoneNumber(
            qiwiNumber,
            phoneNumber.country,
        );
    } catch { };

    if (!phoneNumber?.country || !validationNumber) {
        throw new Error("qiwi number failed validation");
    };

    dbUser.setQiwiNumber({ userId: userId, qiwiNumber: qiwiNumber });

    const data = newQiwiNumberInfo({
        "qiwiNumber": qiwiNumber,
    });

    return data;
};

async function buyPoints(userId, payload) {
    const { balance } = await dbUser.get(userId, {
        _id: 0,
        balance: 1,
    });

    const amount = amountAction[payload];
    const perDayInc = perDayIncAction[payload];

    if (balance < amount) {
        throw new Error("insufficient balance");
    };

    dbUser.incBuyPoint({ userId: userId, amount: amount, perDayInc: perDayInc });

    const data = newBuyPointInfo({
        "amount": amount,
        "perDayInc": perDayInc,
    });

    return data;
};

async function getReferralData(userId) {
    const [user, global] = await Promise.all([
        dbUser.get(userId, {
            referralCount: 1,
        }),
        dbGlobal.get({
            refAmount: 1,
        }),
    ]);

    const { referralCount } = user;
    const { refAmount } = global;

    const refLink = await vkUtils.getRefShortUrl(userId);

    const utilsUserRefCount = Utils.formateNumberAddition(referralCount);
    const utilsGlobalRefAmount = Utils.formateNumberAddition(refAmount);

    const data = newReferralInfo({
        "refAmount": utilsGlobalRefAmount,
        "referralCount": utilsUserRefCount,
        "refLink": refLink,
    });

    return data;
};

async function getStatisticsData() {
    const [userCount, userRefCount, global] = await Promise.all([
        dbUser.userCount(),
        dbUser.userRefCount(),
        dbGlobal.get({
            outputTotal: 1,
        }),
    ]);

    const { outputTotal } = global;

    const utilsUserCount = Utils.formateNumberAddition(userCount);
    const utilsUserRefCount = Utils.formateNumberAddition(userRefCount);
    const utilsOutputTotal = Utils.formateNumberAddition(outputTotal);

    const data = newStatisticsInfo({
        "userCount": utilsUserCount,
        "userRefCount": utilsUserRefCount,
        "outputTotal": utilsOutputTotal,
    });

    return data;
};

async function getTopOfReferralsData() {
    const limitTops = 5;

    const topsReferralsData = await dbUser.topReferrals(limitTops);

    let message = `👥 Топ по приглашенным людям:\n\n`;

    function saveText(text) {
        message += text;
    };

    for (let i = 0; i < topsReferralsData.length; i++) {
        const element = topsReferralsData[i];

        const userId = element.id;
        const referralCount = element.referralCount;

        const { first_name, last_name } = await vkUtils.getName(userId);

        saveText(`• ${first_name} ${last_name} ➔ ${referralCount}\n`);
    };

    const data = newTopsOfReferrals({
        "text": message,
    });

    return data;
};

async function getTopsOfPerDayInc() {
    const limitTops = 5;

    const topsPerDayIncData = await dbUser.topPerDayInc(limitTops);

    let message = `💲 Топ по доходу:\n\n`;

    function saveText(text) {
        message += text;
    };

    for (let i = 0; i < topsPerDayIncData.length; i++) {
        const element = topsPerDayIncData[i];

        const userId = element.id;
        const perDayInc = element.perDayInc;

        const { first_name, last_name } = await vkUtils.getName(userId);

        saveText(`• ${first_name} ${last_name} ➔ ${perDayInc}\n`);
    };

    const data = newTopsOfDayIncInfo({
        "text": message,
    });

    return data;
};

async function getWalletTemplateData(userId) {
    const [user, global] = await Promise.all([
        dbUser.get(userId, {
            _id: 0,
            availableBalance: 1,
        }),
        dbGlobal.get({
            _id: 0,
            courseDeposit: 1,
            courseOutput: 1
        }),
    ]);

    const { availableBalance } = user;
    const { courseDeposit, courseOutput } = global;

    const globalCourseDeposit = Utils.formateNumberAddition(courseDeposit);
    const userAvailableBalance = Utils.formateNumberAddition(availableBalance / courseOutput);

    const data = newWalletTemplateInfo({
        "courceDeposit": globalCourseDeposit,
        "availableBalance": userAvailableBalance,
    });

    return data;
};

async function handleKeksikDeposit(responseData) {
    const { userId, amount } = responseData;

    const [global] = await Promise.all([
        dbGlobal.get({
            _id: 0,
            courseDeposit: 1,
        }),
    ]);

    const { courseDeposit } = global;

    const userAmount = amount * courseDeposit;

    Promise.all([
        dbUser.incUserBalance(userId, userAmount),
        dbGlobal.incDepositAmount(userAmount),
    ]);

    const utilsUserAmount = Utils.formateNumberAddition(userAmount);

    vkShort.sendMsg(
        userId,
        `✅ Успешное пополнение. +${utilsUserAmount}$`
    );

    const data = newKeksikDepositInfo({
        "amount": utilsUserAmount
    });

    return data;
};

async function getPaymentKeksikQiwi(userId) {
    const [user, global, keksikBalance] = await Promise.all([
        dbUser.get(userId, {
            _id: 0,
            availableBalance: 1,
            qiwiNumber: 1,
            vkDonut: 1,
        }),
        dbGlobal.get({
            _id: 0,
            globalBalanceWithdrawal: 1,
            courseOutput: 1,
        }),
        keksikUtils.balance(),
    ]);

    const { availableBalance, qiwiNumber, vkDonut } = user;
    const { courseOutput, globalBalanceWithdrawal } = global;

    const amount = Utils.readNumber(availableBalance / courseOutput);
    const utilsAmount = Utils.formateNumberAddition(amount);

    if (!qiwiNumber) {
        throw new Error("missing QIWI number");
    };

    if (amount < 12) {
        throw new Error("the balance is less than the validation amount");
    };

    if (!vkDonut) {
        throw new Error("missing vkDonut subscription");
    };

    if (globalBalanceWithdrawal < amount || keksikBalance < amount) {
        throw new Error("the bot's reserve is over");
    };

    Promise.all([
        dbUser.incUserWithdrawalBalance(userId, -availableBalance),
        dbGlobal.incOutputAmount(amount),
        keksikUtils.getPaymentQiwi(amount, qiwiNumber),
    ]);

    const data = newPaymentKeksikQiwiInfo({
        "amount": utilsAmount,
    });

    return data;
};

async function getVkDonutInfoUser(userId) {
    const { vkDonut } = await dbUser.get(userId, {
        _id: 0,
        vkDonut: 1,
    });

    const data = newVkDonutInfo({
        "vkDonut": vkDonut,
    });

    return data;
};

async function getMailingAdmin(text, attachment, countUsers) {
    let offset = 0;

    const startTimeDialogs = Date.now();

    for (let i = 0; i < countUsers; i++) {
        const mailingUser = await dbUser.getUserMailingFind(offset);

        const userIds = mailingUser.map(x => x.id);

        const ids = userIds.join(',');

        offset += 100;

        await Utils.sleep(100);

        vkUtils.msg({
            peerId: ids,
            message: text,
            attachment: attachment,
        });
    };

    const data = newMailingInfo({
        "countMsg": countUsers * 100,
        "timeEnd": (Date.now() - startTimeDialogs) / 1_000,
    });

    return data;

};

async function getBankWithdrawlUser(userId) {
    const [userResponse, global] = await Promise.all([
        dbUser.get(userId, {
            _id: 0,
            vkDonut: 1,
        }),
        dbGlobal.get({
            _id: 0,
            bank: 1,
            courseDeposit: 1,
        }),
    ]);

    const { vkDonut } = userResponse;
    const { courseDeposit } = global;
    const { count, amount, usersBank } = global.bank; 

    const amountСurrency = amount * courseDeposit; 

    console.log(usersBank)

    if (!vkDonut) {
        throw new Error("missing vkDonut subscription");
    };

    if (usersBank.includes(userId)) {
        throw new Error("you have already collected the bank");
    };

    if (count <= 0) {
        throw new Error("all the players took the pot");
    };

    Promise.all([
        dbGlobal.incBankUser(userId),
        dbUser.incUserWithdrawalBalance(userId, amountСurrency),
    ]);

    const data = newBankWithdrawlInfo({
        "amount": amount,
    });

    return data;
};


module.exports = {
    getProfileData,
    setQiwiNumberForUser,
    buyPoints,
    getReferralData,
    getStatisticsData,
    getTopOfReferralsData,
    getTopsOfPerDayInc,
    getWalletTemplateData,
    handleKeksikDeposit,
    getPaymentKeksikQiwi,
    getVkDonutInfoUser,
    getMailingAdmin,
    getBankWithdrawlUser,
};