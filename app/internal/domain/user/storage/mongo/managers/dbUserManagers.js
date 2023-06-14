const { User } = require("../../model/user");
const { createUser } = require("./createUser");

const dbUser = {
    get: (id, payload = { _id: 0, id: 1 }) => User.findOne({ id }, payload).lean(),

    add: ({ id, referrerId }) => createUser(id, referrerId),
};

module.exports = {
    dbUser,
};