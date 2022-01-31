import { Command } from "commander";
import { prepareOptions } from "./helpers/processing.mjs";
import { setup } from "./helpers/stomp.mjs";
import { getDescription } from "./lang/lang.mjs";

export function run(argv) {
	const program = new Command();

	const description = getDescription();

	program.version("1.0.1", "-v, --version", "output the current version");
	program.description(description.main);
	program
		.option("-u, --url <url...>", description.url)
		.option("-d, --destination <destination...>", description.destination)
		.option("-m, --message <message>", description.message)
		.option("-sj, --sock-js", description.sockJs)
		.option("-l, --logs", description.logs);
    
	program.parse(argv);

	const options = program.opts();

	setup(prepareOptions(options));
}