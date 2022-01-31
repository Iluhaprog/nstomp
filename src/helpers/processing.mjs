const MAX_OPTION_LENGTH = 2;

export function prepareOptions(options) {
	const result = {
		url: options.url[0],
		connectionHeaders: null,
		destination: null,
		destinationHeaders: null,
		message: options.message || null,
		withSockJS: options.withSockJS || false,
		logs: options.logs || false,
	};

	if (options.url.length === MAX_OPTION_LENGTH) {
		result.connectionHeaders = JSON.parse(options.url[1]);
	}

	if (options.destination) {
		result.destination = options.destination[0];

		if (options.destination.length === MAX_OPTION_LENGTH) {
			result.destinationHeaders = JSON.parse(options.destination[1]);
		}
	}

	return result;
}