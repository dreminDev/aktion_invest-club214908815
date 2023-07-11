const { model,  Schema } = require('mongoose');

const TransactionsSchema = new Schema({
  type: {
    type: "string",
    required: true,
  },
  senderId: {
    type: "number",
  }, 
  recipientId: {
    type: "number"
  },
  currency: {
    type: "string",
    required: true
  },
  amount: {
    type: "number",
    required: true, 
    min: 1
  },
  metaData: {
    type: "object",
  }
})

const Transactions = new model("transactions", TransactionsSchema);

module.exports = {
  Transactions,
};