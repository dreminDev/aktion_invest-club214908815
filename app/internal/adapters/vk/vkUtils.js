const { getRandomId, resolveResource } = require("vk-io");

const { api } = require("./vk");

const { Utils } = require("../../../pkg/utils/utils");

const log = console.log;

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

    



};

module.exports = {
    vkUtils,
};