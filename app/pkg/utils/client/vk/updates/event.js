const { updates } = require("../../../../../internal/adapters/vk/vk");

const { executeCommand } = require("../commandManagers/executeCommand");

function updatesEvent() {
    updates.on('message_event', async (msg) => {
        executeCommand(msg);
    });
};

module.exports = {
    updatesEvent,
};