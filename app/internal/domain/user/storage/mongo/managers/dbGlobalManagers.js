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
    
    incOutputAmount: (amount) => Global.updateMany({ $inc: { outputTotal: amount, outputDay: amount, globalBalanceWithdrawal: -amount } }).then(),

    incWithdrawalBalance: (amount) => Global.updateMany({ $inc: { balanceWithdrawal: amount } }),

    setNewDay: () => Global.updateMany({ $set: { depositDay: 0, outputDay: 0 } }),

    depositBank: (amount) => Global.updateMany({ $set: { "bank.count": 10, "bank.amount": amount } }),
};

module.exports = {
    dbGlobal,
};