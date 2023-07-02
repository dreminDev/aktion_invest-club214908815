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

    incUserWithdrawalBalance: (userId, amount) => User.updateOne({ id: userId }, { $inc: { availableBalance: amount } }).then(),

    incInvest: ({ userId, amount }) => User.updateOne({ id: userId }, { $inc: { availableBalance: amount } }).then(),

    banType: (userId, type) => User.updateOne({ id: userId }, { $set: { ban: type } }).then(),

    getAdmins: async () => {
        const data = await User.find({ admin: 1 }, { id: 1, _id: 0 }).lean();
        
        const adminArray = data.map(x => x.id)
    
        return adminArray;
    }
};

module.exports = {
    dbUser,
};