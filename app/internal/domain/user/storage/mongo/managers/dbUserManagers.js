const { User } = require("../../model/user");
const { createUser } = require("./createUser");

const dbUser = {
    get: (id, payload = { _id: 0, id: 1 }) => User.findOne({ id }, payload).lean(),

    add: ({ id, referrerId }) => createUser(id, referrerId),

    setQiwiNumber: ({ userId, qiwiNumber }) => User.updateOne({ id: userId }, { $set: { qiwiNumber: qiwiNumber } }).then(),

    incBuyPoint: ({ userId, amount, perDayInc }) => User.updateOne({ id: userId }, { $inc: { balance: -amount, perDayInc: perDayInc } }).then(),
};

module.exports = {
    dbUser,
};