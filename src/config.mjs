import { Command } from "commander";
import { getDescription } from "./lang/lang.mjs";
import info from "./info.mjs";

const program = new Command();

const description = getDescription();

program.version(info.version, "-v, --version", "output the current version");
program.description(description.main);
program
	.option("-u, --url <url...>", description.url)
	.option("-d, --destination <destination...>", description.destination)
	.option("-m, --message <message>", description.message)
	.option("-f, --files <files...>", description.files)
	.option("-c, --config <path>", description.config)
	.option("-sj, --sock-js", description.sockJs)
	.option("-l, --logs", description.logs);

export { program };