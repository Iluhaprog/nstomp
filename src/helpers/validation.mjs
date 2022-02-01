import { getLabels, getMessages } from "../lang/lang.mjs";
import { showError } from "./out.mjs";

const labels = getLabels();
const messages = getMessages();

export function isJSON(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

export function optionsIsValid(options) {
	if (!options.url) {
		showError(messages.missedURL, labels.ERROR);
		return false;
	}
	return true;
}