const { Global } = require("../../model/global");

const dbGlobal = {
    get: (payload) => Global.findOne({}, payload).lean(),

    add: async () => {
        const count = await Global.count();

        if (count) return;
        
        Global.create({});

        console.log('[ GLOBAL TABALE CREATE ]')
    },
};

module.exports = {
    dbGlobal,
};