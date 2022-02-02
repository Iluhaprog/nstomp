const description = {
	main: "This module is created to test a WebSocket connection using the STOMP protocol",
	url: "url where need connect and connection headers by needed" + 
        "\n📖 Examples:" +
        "\n❱  nstomp -u http://localhost '{\"key\": \"value\"}'" +
        "\n❱  nstomp -u http://localhost",
	destination: "destination for subscription or message sending and headers by needed" +
        "\n📖 Examples:" +
        "\n❱  nstomp -u ... -d /destination '{\"key\": \"value\"}'" +
        "\n❱  nstomp -u ... -d /destination",
	message: "message to send" + 
        "\n📖 Examples:" +
        "\n❱  nstomp -u ... -d ... -m '{\"message\": \"hello world!\"}'" +
        "\n❱  nstomp -u ... -d ... -m 'hello world!'",
	logs: "show logs of libraries used in nstomp",
	sockJs: "enable connection with SockJS",
	config: "path to config file with options",
	files: "list of files to send",
};

const defaultMessages = {
	stompErrorMessage: "Possibly invalid url.",
	missedURL: "You may have missed url.",
	uploaded: "Uploaded!",
};

const labels = {
	CONNECTION_HEADERS: "CONNECTION HEADERS",
	STOMP_ERROR: "STOMP ERROR",
	WEBSOCKET_ERROR: "WEBSOCKET ERROR",
	DISCONNECT_HEADERS: "DISCONNECT HEADERS",
	DISCONNECT_BODY: "DISCONNECT BODY",
	DESTINATION_HEADERS: "DESTINATION HEADERS",
	HEADERS: "HEADERS",
	MESSAGE: "MESSAGE",
	ERROR: "ERROR",
	WARNING: "WARNING",
};

export const enUS = {
	description,
	defaultMessages,
	labels,
};