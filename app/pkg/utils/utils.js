const Utils = {
    getTime: () => {
        const date = new Date(Date.now())
     
        return `${date.getHours()}:${date.getMinutes().toString().length >= 2 ? date.getMinutes() : '0' + date.getMinutes()}:${date.getSeconds().toString().length >= 2 ? date.getSeconds() : '0' + date.getSeconds()}`
    },
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    random: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
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