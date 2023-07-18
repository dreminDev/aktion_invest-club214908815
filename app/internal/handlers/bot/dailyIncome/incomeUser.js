const { User } = require("../../../domain/user/storage/model/user");
const { dbUser } = require("../../../domain/user/storage/mongo/managers/dbUserManagers");

async function accrual() {
    setInterval(async() => {
        const userList = await User.find({ 
            ban: false, 
            taxCharged: false, 
            perDayInc: { $gt: 0 },
            availableBalance: { $lte: 1_800_000 }
        }, { 
            _id: 0, 
            id: 1, 
            perDayInc: 1,
            vkDonut: 1,
            taxCharged: 1,
        }).lean();
        
        userList.forEach(async element => {
            const userId = element.id;
            const perDayInc = element.perDayInc;
            const vkDonut = element.vkDonut;
            const taxCharged = element.taxCharged;

            if (!vkDonut || taxCharged) {
                return;
            };

            const amount = perDayInc / 144;
    
            await dbUser.incInvest({ userId: userId, amount: amount });
        });
    }, 1_200_000);
};

module.exports = {
    accrual,
};