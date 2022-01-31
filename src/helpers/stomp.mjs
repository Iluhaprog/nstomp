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

const { w3cwebsocket } = w3cw;
global.WebSocket = w3cwebsocket;

const { Stomp } = stomp;
const messages = getMessages();
const labels = getLabels();

export function setup({
	url,
	connectionHeaders,
	destination,
	destinationHeaders,
	message,
	withSockJS,
	logs,
}) {
	const connection = createConnection({
		url,
		headers: connectionHeaders,
		withSockJS,
		logs,
	});

	connection.onConnect = () => onConnect({
		connection,
		destination,
		destinationHeaders,
		message
	});

	connection.activate();
}

export function createConnection({ url, headers, withSockJS, logs }) {
	const client = Stomp.over(() => withSockJS ? new SockJS(url) : new w3cwebsocket(url));
	if (headers) {
		showHeaders(headers, labels.CONNECTION_HEADERS);
		client.connectHeaders = headers;
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