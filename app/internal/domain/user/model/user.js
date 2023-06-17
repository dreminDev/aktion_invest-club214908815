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

module.exports = {
    newProfileInfo,
    newQiwiNumberInfo,
    newBuyPointInfo,
    newReferralInfo
};