import fs from "fs";
import w3cw from "websocket";
import stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
	showHeaders,
	showError,
	showWarn,
	showMessage,
	showFile,
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

function sendFiles({ destinationHeaders, connection, destination, files }) {
	let filesCounter = files.length;
	const NO_FILES = 0;

	showHeaders(destinationHeaders, labels.DESTINATION_HEADERS);

	files.forEach((file) => {
		sendBinaryData({
			file,
			connection,
			destination,
			destinationHeaders,
			onLoad: (file) => {
				filesCounter -= 1;
				if (filesCounter <= NO_FILES) {
					connection.deactivate();
				}
				showFile(` ${messages.uploaded} `, `File: ${file}`);
			}
		});
	});
}

function sendBinaryData({
	file,
	connection,
	destination,
	destinationHeaders,
	onLoad,
}) {
	fs.readFile(file, "utf-8", (err, data) => {
		if (err) {
			showError(err);
		} else {
			const body = new TextEncoder().encode(data);
			
			const headers = Object.assign({ "content-type": "application/octet-stream" }, destinationHeaders);

			connection.publish({
				destination,
				headers,
				binaryBody: body,
			});

			onLoad(file);
		}
	});
}

function showFrame(frame) {
	showHeaders(frame.headers, labels.DESTINATION_HEADERS);
	showMessage(frame.body);
}