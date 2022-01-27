import w3cw from "websocket";
import stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import chalk from "chalk";
import { showHeaders } from "./helpers.mjs";

const { w3cwebsocket } = w3cw;
global.WebSocket = w3cwebsocket;

const { Stomp } = stomp;

export function createConnection({ url, headers, withSockJS, logs }) {
	const client = Stomp.over(() => withSockJS ? new SockJS(url) : new w3cwebsocket(url));
	if (headers) {
		showHeaders(JSON.parse(headers), "[CONNECTION HEADERS]");
		client.connectHeaders = JSON.parse(headers);
	}

	if (!logs) client.debug = () => {};

	client.onStompError = onStompError;
	client.onWebSocketError = onWebSocketError;
	client.onDisconnect = onDisconnect;

	return client;
}

function onStompError(error) {
	console.log(chalk.bgRed.white("[STOMP ERROR]"));
	console.log(error);
}

function onWebSocketError() {
	console.log(chalk.bgRed.white("[WEBSOCKET ERROR]\n"));
	console.log(chalk.red("Possibly invalid url.\n"));
}

function onDisconnect(frame) {
	console.log(chalk.bgYellow.bold.blue("[DISCONNECTED]\n"));
	if (frame.headers) {
		console.log(chalk.bgGreen.bold.white("[DISCONNECT HEADERS]"));
		console.log(frame.headers);
	}
	if (frame.body) {
		console.log(chalk.bgBlue.bold.white("[DISCONNECT BODY]"));
		console.log(frame.body);
	}
}