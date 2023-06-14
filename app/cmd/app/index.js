const { startVK, startApiVk } = require("../../internal/adapters/vk/vk");
const { dbConnect } = require("../../internal/domain/user/storage/mongo/connect");

const { dbGlobal } = require("../../internal/domain/user/storage/mongo/managers/dbGlobalManagers");

const { addCommand } = require("../../pkg/utils/client/commandManagers/execute");
const { initUserHandlers } = require("../../pkg/utils/client/commandManagers/initCommand");

const { updatesMessage } = require("../../pkg/utils/client/updatesVk/message");

function main() {
    startVK();
    startApiVk();

    dbConnect();
    dbGlobal.add();

    initUserHandlers(addCommand);

    updatesMessage();
    
};

main();