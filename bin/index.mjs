#!/usr/bin/env node

import { Command } from "commander";
import { createConnection } from "./stopmHelpers.mjs";
import { showHeaders, showMessage } from "./helpers.mjs";

const program = new Command();

program.version("0.0.1");
program.description("This tool using for testing WebSockets with stomp.");

program
	.option("-u, --url <url>", "url where need connect.")
	.option("-d, --destination <destination>", "destination for  subscription or message sending.")
	.option("-sm, --send-message <message>", "message for sending")
	.option("-l, --listen", "listen by destination.")
	.option("-ch, --connection-headers <headers>", "headers for connection.")
	.option("-dh, --destination-headers <headers>", "headers for destination.")
	.option("-sj, --sock-js", "enable connection with SockJS.")
	.option("--logs", "show logs of libraries used in nstomp.");

program.parse(process.argv);

const options = program.opts();

const connection = createConnection({
	url: options.url,
	headers: options.connectionHeaders,
	withSockJS: options.sockJs,
	logs: options.logs,
});

function onConnect() {
	const headers = options.destinationHeaders ? JSON.parse(options.destinationHeaders) : {};
	if (options.destination) {
		if (options.listen) {
			connection.subscribe(options.destination, (msg) => {
				showMessage(msg.body);
				showHeaders(msg.headers);
			}, headers);
		}

		if (options.sendMessage) {
			showMessage(options.sendMessage);
			showHeaders(headers);

			console.log("\n\n");
			connection.send(options.destination, headers, options.sendMessage);
			connection.deactivate();
		}
	}
}

connection.onConnect = onConnect;

connection.activate();