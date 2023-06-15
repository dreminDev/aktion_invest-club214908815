const { parseNumber, isValidPhoneNumber } = require('libphonenumber-js');

const { dbUser } = require("../storage/mongo/managers/dbUserManagers");
const { dbGlobal } = require('../storage/mongo/managers/dbGlobalManagers');

const { Utils } = require("../../../../pkg/utils/utils");
const { amountAction, perDayIncAction } = require("../../../handlers/usecase/purchases/amount.json");

const { newProfileInfo, newQiwiNumberInfo, newBuyPointInfo } = require("../model/user");



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
            courceOutput: 1,
        }),
    ])

    const { vkDonut, balance, referralCount, perDayInc, qiwiNumber, availableBalance } = user;
    const { courceOutput } = global;

    const status = vkDonut ? 'Акционер' : 'Обычный';

    const userBalance = Utils.formateNumberAddition(balance);
    const userRefCount = Utils.formateNumberAddition(referralCount);
    const userPerDayInc = Utils.formateNumberAddition(perDayInc);
    const userQiwiNumber = qiwiNumber ? qiwiNumber : '❗️ не указан';
    const userAvailableBalance = Utils.formateNumberAddition(availableBalance / courceOutput);

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

module.exports = {
    getProfileData,
    setQiwiNumberForUser,
    buyPoints,
};