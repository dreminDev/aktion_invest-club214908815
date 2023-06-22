const { User } = require("../../model/user");
const { createUser } = require("./createUser");

const dbUser = {
    get: (id, payload = { _id: 0, id: 1 }) => User.findOne({ id }, payload).lean(),

    add: ({ id, referrerId, referralCount }) => createUser(id, referrerId, referralCount),

    userCount: () => User.count(),

    userRefCount: () => User.count({ referrerId: { $gt: 0 }}),

    setQiwiNumber: ({ userId, qiwiNumber }) => User.updateOne({ id: userId }, { $set: { qiwiNumber: qiwiNumber } }).then(),

    incBuyPoint: ({ userId, amount, perDayInc }) => User.updateOne({ id: userId }, { $inc: { balance: -amount, perDayInc: perDayInc } }).then(),

    topReferrals: (limit) => User.find({}, { _id: 0, id: 1, referralCount: 1 }).sort({ referralCount: -1 }).limit(limit).lean(),

    topPerDayInc: (limit) => User.find({}, { _id: 0, id: 1, perDayInc: 1 }).sort({ perDayInc: -1 }).limit(limit).lean(),

    incUserBalance: (userId, amount) => User.updateOne({ id: userId }, { $inc: { balance: amount } }).then(),
};

module.exports = {
    dbUser,
};