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
		logs: options.logs || false,
	};

	if (options.url && options.url.length === MAX_OPTION_LENGTH) {
		resultOptions.connectionHeaders = JSON.parse(options.url[1]);
	}

	if (options.destination) {
		resultOptions.destination = options.destination[0];

		if (options.destination.length === MAX_OPTION_LENGTH) {
			resultOptions.destinationHeaders = JSON.parse(options.destination[1]);
		}
	}

	return resultOptions;
}

export function prepareConfigFile({ path, encoding = "utf8", setup }) {
	fs.readFile(path, encoding, (err, data) => {
		if (err) {
			showError(err, "READING ERROR");
		} else {
			const options = JSON.parse(data);
			const connectionHeaders = options.connectionHeaders || null;
			const destinationHeaders = options.destinationHeaders || null;
			const resultOptions = {
				url: options.url,
				connectionHeaders: connectionHeaders,
				destination: options.destination,
				destinationHeaders: destinationHeaders,
				message: prepareMessage(options.message),
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