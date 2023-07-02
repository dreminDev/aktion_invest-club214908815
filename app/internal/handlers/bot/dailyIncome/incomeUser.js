const { User } = require("../../../domain/user/storage/model/user");
const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");

async function accrual() {
    setInterval(async() => {
        const userList = await User.find({ ban: false }, { _id: 0, id: 1, perDayInc: 1 }).lean();
        userList.forEach(async element => {
            const userId = element.id;
            const perDayInc = element.perDayInc;
            const percent = element.percentageIncome;

            const amount = perDayInc / 72;
    
            dbUser.incInvest({ userId: userId, amount: amount });
        });
    }, 1_200_000);
};

module.exports = {
    accrual,
};