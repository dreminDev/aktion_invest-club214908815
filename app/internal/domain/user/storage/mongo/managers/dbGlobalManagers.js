const { Global } = require("../../model/global");

const dbGlobal = {
    get: (payload) => Global.findOne({}, payload).lean(),

    add: async () => {
        const count = await Global.count();

        if (count) return;
        
        Global.create({});

        console.log('[ GLOBAL TABALE CREATE ]')
    },

    incDepositAmount: (amount) => Global.updateMany({ $inc: { depositTotal: amount, depositDay: amount } }).then(),
    
    incOutputAmount: (amount) => Global.updateMany({ $inc: { outputTotal: amount, outputDay: amount, globalBalanceWithdrawal: -amount } }),

    incWithdrawalBalance: (amount) => Global.updateMany({ $inc: { globalBalanceWithdrawal: amount } }),

    incBankUser: (userId) => Global.updateMany({ $inc: { "bank.count": -1 }, $push: { "bank.usersBank": userId } }),

    setNewDay: () => Global.updateMany({ $set: { depositDay: 0, outputDay: 0 } }),

    setLikePost: (postId) => Global.updateMany({ $set: { likePost: postId } }),

    depositBank: (amount, count) => Global.updateMany({ $set: { "bank.count": count, "bank.amount": amount, "bank.usersBank": [] } }).then(),
};

module.exports = {
    dbGlobal,
};