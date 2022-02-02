import w3cw from "websocket";
import stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
	showHeaders,
	showError,
	showWarn,
	showMessage,
} from "./out.mjs";
import { getLabels, getMessages } from "../lang/lang.mjs";
import { optionsIsValid } from "./validation.mjs";

const { w3cwebsocket } = w3cw;
global.WebSocket = w3cwebsocket;

const { Stomp } = stomp;
const messages = getMessages();
const labels = getLabels();

export function setup(options) {
	const {
		destination,
		destinationHeaders,
		message,
	} = options;

	if (optionsIsValid(options)) {
		const connection = createConnection(options);

		connection.onConnect = () => onConnect({
			connection,
			destination,
			destinationHeaders,
			message
		});

		connection.activate();
	}
}

export function createConnection({ url, connectionHeaders, withSockJS, logs }) {
	const client = Stomp.over(() => withSockJS ? new SockJS(url) : new w3cwebsocket(url));
	if (connectionHeaders) {
		showHeaders(connectionHeaders, labels.CONNECTION_HEADERS);
		client.connectHeaders = connectionHeaders;
	}

	if (!logs) client.debug = () => {};

	client.onStompError = onStompError;
	client.onWebSocketError = onWebSocketError;
	client.onDisconnect = onDisconnect;

	return client;
}

function onStompError(error) {
	showError(error, labels.STOMP_ERROR);
}

function onWebSocketError() {
	showError(
		messages.stompErrorMessage, 
		labels.WEBSOCKET_ERROR
	);
}

function onDisconnect(frame) {
	if (frame.headers) {
		showWarn(frame.headers, labels.DISCONNECT_HEADERS);
	}
	if (frame.body) {
		showWarn(frame.body, labels.DISCONNECT_BODY);
	}
}

function onConnect({
	connection,
	destination,
	destinationHeaders,
	message
}) {
	if (message) {
		showFrame({
			body: message,
			headers: destinationHeaders,
		});
		connection.send(destination, destinationHeaders, message);
		connection.deactivate();
	} else {
		connection.subscribe(destination, showFrame, destinationHeaders);
	}
}

function showFrame(frame) {
	showMessage(frame.body);
	showHeaders(frame.headers, labels.MESSAGE_HEADERS);
}