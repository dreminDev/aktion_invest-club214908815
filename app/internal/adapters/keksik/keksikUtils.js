const axios = require("axios");

require("dotenv").config();

const baseApiUrl = 'https://api.keksik.io';

const group = process.env.GROUP_ID;
const token = process.env.KEKSIK_TOKEN;

const apiVersion = 1;

const keksikUtils = {
    balance: async () => {
        const response = await axios.post(`${baseApiUrl}/balance`, { 
            group, token,
            v: apiVersion,
        });
        
        return response.data.balance / 100;
    },

    getPaymentQiwi: async (amount, qiwi) => {
        const response = await axios.post(`${baseApiUrl}/payments/create`, { 
            group, token,
            v: apiVersion, 
            system: 'qiwi', 
            purse: `${qiwi}`, 
            amount,
        });
        
        return response.data;
    },
};

module.exports = {
    keksikUtils,
};