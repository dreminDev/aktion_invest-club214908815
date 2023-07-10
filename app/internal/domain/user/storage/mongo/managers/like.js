const { Like } = require("../../model/like");

const dbLike = {
    get: (userId, postId, payload) => Like.findOne({ likerId: userId, postId: postId }, payload).lean(),

    add: (userId, postId, amount) => {
        Like.create({
            likerId: userId,
            postId: postId,
            amount: amount, 
            create_at: Date.now(),
        });
    },
};

module.exports = {
    dbLike,
};