const { Transactions } = require('../../model/transactions');

const withdraw = 'withdraw';
const deposit = 'deposit';

const rub = 'rub';

module.exports = {
    withdraw: withdraw,
    deposit: deposit,
    rub: rub,
    async transactionByKeksikPaymentId(paymentId) {
        return Transactions.findOne({
            'metaData.keksikPaymentId': Number(paymentId),
        });
    },
    async lastTransactionByRecipientId(recipientId, type) {
        return Transactions.findOne({
            recipientId: Number(recipientId),
            type: type,
        }).sort({ createdAt: -1 });
    },
    async createTransaction(transaction) {
        if (typeof transaction !== 'object') {
            throw new Error('transaction must be a object');
        }

        return Transactions.create(transaction);
    },
};
