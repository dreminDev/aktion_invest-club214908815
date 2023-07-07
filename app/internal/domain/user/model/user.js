function newProfileInfo(data) {
    return {
        "status": data.status,
        "balance": data.balance,
        "refCount": data.refCount,
        "perDayInc": data.perDayInc,
        "qiwiNumber": data.qiwiNumber,
        "availableBalance": data.availableBalance,
    };
};

function newQiwiNumberInfo(data) {
    return {
        "qiwiNumber": data.qiwiNumber,
    };
};

function newBuyPointInfo(data) {
    return {
        "amount": data.amount,
        "perDayInc": data.perDayInc,
    };
};

function newReferralInfo(data) {
    return {
        "refAmount": data.refAmount,
        "referralCount": data.referralCount,
        "refLink": data.refLink,
    };
};

function newStatisticsInfo(data) {
    return {
        "userCount": data.userCount,
        "userRefCount": data.userRefCount,
        "outputTotal": data.outputTotal,
    };
};

function newTopsOfReferrals(data) {
    return {
        "text": data.text,
    };
};

function newTopsOfDayIncInfo(data) {
    return {
        "text": data.text,
    };
};

function newWalletTemplateInfo(data) {
    return {
        "courseDeposit": data.courceDeposit,
        "availableBalance": data.availableBalance,
    };
};

function newKeksikDepositInfo(data) {
    return {
        "amount": data.amount
    };
};

function newPaymentKeksikQiwiInfo(data) {
    return {
        "amount": data.amount
    };
};

function newVkDonutInfo(data) {
    return {
        "vkDonut": data.vkDonut,
    };
};

function newMailingInfo(data) {
    return {
        "countMsg": data.countMsg,
        "timeEnd": data.timeEnd,
    };
};

function newBankWithdrawlInfo(data) {
    return {
        "amount": data.amount
    };
};

function newCommentBonusInfo(data) {
    return {
        "amount": data.amount,
    };
};

function newChargeAmountInfo(data) {
    return {
        "days": data.days,
        "amount": data.amount,
        "perDayInc": data.perDayInc, 
        "vkDonut": data.vkDonut,
    };
};

function newChardgeTaxInfo(data) {
    return {
        "amount": data.amount,
    };
};

function newDailyBonusInfo(data) {
    return {
        "amount": data.award,
        "photo": data.photo 
    };
};

module.exports = {
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
    newCommentBonusInfo,
    newChargeAmountInfo,
    newChardgeTaxInfo,
    newDailyBonusInfo,
};