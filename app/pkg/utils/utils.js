const Utils = {
    getTime: () => {
        const date = new Date(Date.now())
     
        return `${date.getHours()}:${date.getMinutes().toString().length >= 2 ? date.getMinutes() : '0' + date.getMinutes()}:${date.getSeconds().toString().length >= 2 ? date.getSeconds() : '0' + date.getSeconds()}`
    },
};

module.exports = {
    Utils,
};