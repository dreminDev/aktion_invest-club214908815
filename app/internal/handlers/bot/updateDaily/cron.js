const cron = require('node-cron'); 
const { dbGlobal } = require('../../../domain/user/storage/mongo/managers/dbGlobalManagers');

function cronStart() {
    cron.schedule('0 0 0 * * *', async () => {
        dbGlobal.setNewDay();
    });
};

module.exports = {
    cronStart,
};