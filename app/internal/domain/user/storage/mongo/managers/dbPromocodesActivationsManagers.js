const { PromocodeActivations } = require("../../model/promoActivations");


const dbPromocodeActivate = {
    get: (userId, name, payload = { _id: 0 }) => PromocodeActivations.findOne({ promocode_name: name, userId: userId }, payload).lean(),

    add: ({ userId, promocode_name, promocode_amount }) => {
        PromocodeActivations.create({
            userId,
            promocode_name,
            promocode_amount,
            created_at: Date.now(),
        }).then();
    },
};

module.exports = {
    dbPromocodeActivate,
};