const { Transactions } = require("../../model/transactions")

const withdraw = "withdraw"
const rub = "rub"

module.exports = {
  withdraw: withdraw,
  rub: rub,
  async transactionByKeksikPaymentId(paymentId) {
    return Transactions.findOne({
      "metaData.keksikPaymentId": Number(paymentId),
    })
  },
  async createTransaction(transaction) {
    if (typeof transaction !== 'object') {
      throw new Error('transaction must be a object')
    }

    return Transactions.create(transaction)
  }
}