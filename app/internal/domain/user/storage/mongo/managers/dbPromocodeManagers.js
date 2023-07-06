const { dbUser } = require("./dbUserManagers");

const { Promocode } = require("../../model/promocode");
const { dbPromocodeActivate } = require("./dbPromocodesActivationsManagers");


const dbPromocode = {
    get: (name, payload = { _id: 0 }) => Promocode.findOne({ promocode_name: name }, payload).lean(),

    add: ({ promocode_name, promocode_count, promocode_amount }) => {
        Promocode.create({
            promocode_name,
            promocode_count,
            promocode_amount,
        }).then();
    },

    activate: ({ userId, name, amount }) => {
        Promise.all([
            Promocode.updateOne({ promocode_name: name }, { $inc: { promocode_count: -1 } }).then(),
            dbPromocodeActivate.add({ userId: userId, promocode_name: name, promocode_amount: amount }),
        ]);
    },
};

module.exports = {
    dbPromocode,
};