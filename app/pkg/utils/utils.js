const Utils = {
    getTime: () => {
        const date = new Date(Date.now())
     
        return `${date.getHours()}:${date.getMinutes().toString().length >= 2 ? date.getMinutes() : '0' + date.getMinutes()}:${date.getSeconds().toString().length >= 2 ? date.getSeconds() : '0' + date.getSeconds()}`
    },
    readNumber: (number) => {
        return Math.round(Math.floor(number * 1000) / 10) / 100;
    },
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",");
    },
    formateNumberAddition: (num) => {
        const formate = Utils.readNumber(num)

        return formate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",");
    },
};

module.exports = {
    Utils,
};