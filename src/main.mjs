import { prepareConfigFile, prepareOptions } from "./helpers/processing.mjs";
import { setup } from "./helpers/stomp.mjs";
import { program } from "./config.mjs";

export function main(argv) {
	program.parse(argv);

	const options = program.opts();
	
	if (options.config) {
		prepareConfigFile({ path: options.config, setup });
	} else {
		setup(prepareOptions(options));
	}
}