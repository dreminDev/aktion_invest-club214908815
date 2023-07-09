const { updates } = require("../../../../../internal/adapters/vk/vk");

const { dbUser } = require("../../../../../internal/domain/user/storage/mongo/managers/dbUserManagers");
const { vkShort } = require("../../../../../internal/adapters/vk/vkUtils");


function updatesDonutCreate() {
    updates.on('donut_subscription_create', async (msg) => {
        const userId = msg.userId;

        Promise.all([
            dbUser.incBuyPoint({ userId: userId, amount: 0, perDayInc: 84_000 }),
            dbUser.vkDonutStatus(userId, true),

            vkShort.sendMsg(userId, "🎉 Успешное подключение подписки «VK Donut»\n\n• Выдано:\n+ Статус «Акционер»\n+ Доступ к выводу\n+ 10% к ежедневному бонусу\n+ Возможность забирать деньги с банка\n+ Бонус за каждый комментарий (15$)\n+ Акция «Tesla»\n+ Доступ к беседе с промокодами\n\n• Убрано:\n- Налоги"),
        ]);
    });
};

function updatesDobutProlonged() {
    updates.on('donut_subscription_prolonged', async (msg) => {
        const userId = msg.userId;

        const { isPurchasedVkDonut } = await dbUser.get(userId, {
            _id: 0,
            isPurchasedVkDonut: 1,
        });

        vkShort.sendMsg(userId, "🎉 Успешное продление подписки, твои преимущества остаются с тобой)");

        if (isPurchasedVkDonut) {
            dbUser.incBuyPoint({ userId: userId, amount: 0, perDayInc: 0 });
        };

        if (!isPurchasedVkDonut) {
            Promise.all([
                dbUser.incBuyPoint({ userId: userId, amount: 0, perDayInc: -84_000 }),
                dbUser.setPurchasedVkDonut(userId, true),
            ]);
        };
    });
};

function updatesDonutExpired() {
    updates.on('donut_subscription_expired', async (msg) => {
        const userId = msg.userId;

        vkShort.sendMsg(userId, "🚫 Отказ от оплаты подписки. Все преимущества подписки были изъяты.");

        if (isPurchasedVkDonut) {
            dbUser.incBuyPoint({ userId: userId, amount: 0, perDayInc: 0 });
        };

        if (!isPurchasedVkDonut) {
            Promise.all([
                dbUser.incBuyPoint({ userId: userId, amount: 0, perDayInc: -84_000 }),
                dbUser.setPurchasedVkDonut(userId, true),
                dbUser.vkDonutStatus(userId, false),
            ]);
        };
    });
};

function vkDonutStart() {
    updatesDonutCreate();
    updatesDonutExpired();
    updatesDobutProlonged();
};

module.exports = {
    vkDonutStart,
};