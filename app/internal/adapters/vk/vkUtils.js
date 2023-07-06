const { getRandomId, resolveResource } = require("vk-io");
const { api } = require("./vk");

require("dotenv").config();
const { Utils } = require("../../../pkg/utils/utils");

const log = console.log;
const GROUP_ID = process.env.GROUP_ID;

const vkUtils = {
    msg: ({ peerId, message, attachment, keyboard, template }) => {

        const payload = {
            message,
            attachment,
            keyboard,
            template,
            random_id: getRandomId()
        };

        typeof peerId !== 'object' ? payload.peer_ids = peerId : payload.peer_id = peerId;

        api.messages.send(payload);
    },
    sendEventAnswer: (props) => {
        const { eventId, userId, peerId, text } = props;

        const data = {
            event_id: eventId,
            user_id: userId,
            peer_id: peerId,
        }

        if (text) {
            data.event_data = JSON.stringify({
                "type": "show_snackbar",
                "text": text
            });
        };

        api.messages.sendMessageEventAnswer(data).catch((err) => {
            log(`${Utils.getTime()}`, err);
        });
    },
    getRefShortUrl: async (userId) => {
        const url = `vk.me/public${GROUP_ID}?ref=${userId}`;
        const short = (await api.utils.getShortLink({ url })).short_url;

        return short;
    },

    getInfoUser: async (userId) => {
        const [data] = await api.users.get({
            user_ids: userId,
        });

        return data;
    },
    getName: async (userId) => {
        const { first_name, last_name } = await vkUtils.getInfoUser(userId)

        return { first_name: first_name, last_name: last_name };
    },

    getId: async (url) => {
        const resource = await resolveResource({ api: api, resource: url });

        return resource.id;
    },
    getUserSigned: async (userId) => {
        const data = await api.groups.isMember({
            group_id: GROUP_ID,
            user_id: userId,
        });

        return data;
    },
};

const vkShort = {
    sendMsg: (userId, text) => {
        vkUtils.msg({
            peerId: userId,
            message: text
        });
    },
    sendAnswer: (msg, text) => {
        vkUtils.sendEventAnswer({
            eventId: msg.eventId,
            userId: msg.userId,
            peerId: msg.peerId,
            text: text,
        });
    },
}

module.exports = {
    vkUtils,
    vkShort,
};