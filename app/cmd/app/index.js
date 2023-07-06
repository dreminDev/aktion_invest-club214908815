const { serverStart } = require("../../internal/adapters/server/server");
const { startRoutes } = require("../../internal/adapters/server/routes/routes");

const { startVK, startApiVk } = require("../../internal/adapters/vk/vk");
const { dbConnect } = require("../../pkg/utils/client/mongo/connect");

const { dbGlobal } = require("../../internal/domain/user/storage/mongo/managers/dbGlobalManagers");

const { addCommand } = require("../../pkg/utils/client/vk/commandManagers/executeCommand");
const { initUserHandlers } = require("../../pkg/utils/client/vk/commandManagers/initCommand");
const { updatesEvent } = require("../../pkg/utils/client/vk/updates/event");

const { updatesMessage } = require("../../pkg/utils/client/vk/updates/message");

const { accrual } = require("../../internal/handlers/bot/dailyIncome/incomeUser");
const { cronStart } = require("../../internal/handlers/bot/updateDaily/cron");

const { bonusStart } = require("../../pkg/utils/bonus/main");
const { vkDonutStart } = require("../../pkg/utils/client/vk/updates/vkDonut");



(function main() {
    startVK();
    startApiVk();

    //serverStart();
    //startRoutes();

    dbConnect();
    dbGlobal.add();

    initUserHandlers(addCommand);

    accrual();
    cronStart();

    bonusStart();
    vkDonutStart();

    updatesMessage();
    updatesEvent();
})();