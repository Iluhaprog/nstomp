import fs from "fs";
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
		files,
	} = options;

	if (optionsIsValid(options)) {
		const connection = createConnection(options);

		connection.onConnect = () => onConnect({
			connection,
			destination,
			destinationHeaders,
			message,
			files,
		});

		connection.activate();
	}
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
	message,
	files,
}) {
	if (message) {
		sendMessage({ connection, message, destinationHeaders, destination });
	} 
	if (files) {
		sendFiles({ connection, destinationHeaders, destination, files });
	}
	if (!message && !files) {
		connection.subscribe(destination, showFrame, destinationHeaders);
	}
}

function sendMessage({
	message,
	destinationHeaders,
	connection,
	destination,
}) {
	showFrame({
		body: message,
		headers: destinationHeaders,
	});
	connection.publish({
		destination, 
		headers: destinationHeaders, 
		body: message,
	});
	connection.deactivate();
}

function sendFiles({
	destinationHeaders,
	connection,
	destination,
	files,
}) {
	files.forEach((file) => {
		sendBinaryData(file, (data) => {
			const body = new TextEncoder().encode(data);
			
			const headers = Object.assign({ 
				"content-type": "application/octet-stream"
			}, destinationHeaders);

			connection.publish({
				destination,
				headers,
				binaryBody: body,
			});
		});
	});
}

function sendBinaryData(file, onSuccess) {
	fs.readFile(file, "utf-8", (err, data) => {
		if (err) {
			showError(err);
		} else {
			onSuccess(data);
		}
	});
}

function showFrame(frame) {
	showMessage(frame.body);
	showHeaders(frame.headers, labels.MESSAGE_HEADERS);
}