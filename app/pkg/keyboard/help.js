const { Keyboard } = require("vk-io");

const keyboard = Keyboard.keyboard;

const textButton = Keyboard.textButton;
const urlButton = Keyboard.urlButton;
const callbackButton = Keyboard.callbackButton

const green = Keyboard.POSITIVE_COLOR;
const red = Keyboard.NEGATIVE_COLOR;
const blue = Keyboard.PRIMARY_COLOR;
const gray = Keyboard.SECONDARY_COLOR;

function constructorKeyboard(type, label, color, payload) {
	switch (type) {
		case "text":
			return textButton({ label, color, payload: { command: payload } });
	};
};

module.exports = {
	keyboard,

	textButton,
	urlButton,
	callbackButton,

	constructorKeyboard,

	green,
	red,
	blue,
	gray,
};