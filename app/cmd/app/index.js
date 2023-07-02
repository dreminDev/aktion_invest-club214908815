const { serverStart } = require("../../internal/adapters/server/server");
const { startRoutes } = require("../../internal/adapters/server/routes/routes");

const { startVK, startApiVk } = require("../../internal/adapters/vk/vk");
const { dbConnect } = require("../../internal/domain/user/storage/mongo/connect");

const { dbGlobal } = require("../../internal/domain/user/storage/mongo/managers/dbGlobalManagers");

const { addCommand } = require("../../pkg/utils/client/commandManagers/executeCommand");
const { initUserHandlers } = require("../../pkg/utils/client/commandManagers/initCommand");
const { updatesEvent } = require("../../pkg/utils/client/updatesVk/event");

const { updatesMessage } = require("../../pkg/utils/client/updatesVk/message");

const { accrual } = require("../../internal/handlers/bot/dailyIncome/incomeUser");
const { cronStart } = require("../../internal/handlers/bot/updateDaily/cron");



(function main() {
    startVK();
    startApiVk();

    serverStart();
    startRoutes();

    dbConnect();
    dbGlobal.add();

    initUserHandlers(addCommand);

    accrual();
    cronStart();

    updatesMessage();
    updatesEvent();
})();