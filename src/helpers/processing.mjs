import fs from "fs";
import { showError } from "./out.mjs";

const MAX_OPTION_LENGTH = 2;

export function prepareOptions(options) {
	const resultOptions = {
		url: options.url ? options.url[0] : null,
		connectionHeaders: null,
		destination: null,
		destinationHeaders: null,
		message: options.message || null,
		withSockJS: options.withSockJS || false,
		files: options.files || null,
		logs: options.logs || false,
	};

	resultOptions.connectionHeaders = getOptionHeaders(options.url);

	if (options.destination) {
		resultOptions.destination = options.destination[0];
		resultOptions.destinationHeaders = getOptionHeaders(options.destination);
	}

	return resultOptions;
}

function getOptionHeaders(option) {
	let headers = null;
	if (option && option.length === MAX_OPTION_LENGTH) {
		headers = JSON.parse(option[1]);
	}
	return headers;
}

export function prepareConfigFile({ path, encoding = "utf8", setup }) {
	fs.readFile(path, encoding, (err, data) => {
		if (err) {
			showError(err, "READING ERROR");
		} else {
			const options = JSON.parse(data);
			const resultOptions = {
				url: options.url,
				connectionHeaders: options.connectionHeaders || null,
				destination: options.destination,
				destinationHeaders: options.destinationHeaders || null,
				message: prepareMessage(options.message),
				files: options.files || null,
				withSockJS: options.withSockJS || false,
				logs: options.logs || false,
			};
			setup(resultOptions);
		}
	});

}

function prepareMessage(message) {
	if (!message) return null;
	
	if (typeof message === "string" || typeof message === "number") return message;

	return JSON.stringify(message);
}