const { Keyboard } = require("vk-io");

const keyboard = Keyboard.keyboard;

const textButton = Keyboard.textButton;
const urlButton = Keyboard.urlButton;
const callbackButton = Keyboard.callbackButton

const green = Keyboard.POSITIVE_COLOR;
const red = Keyboard.NEGATIVE_COLOR;
const blue = Keyboard.PRIMARY_COLOR;
const gray = Keyboard.SECONDARY_COLOR;

module.exports = {
	keyboard,

	textButton,
	urlButton,
	callbackButton,

	green,
	red,
	blue,
	gray,
};