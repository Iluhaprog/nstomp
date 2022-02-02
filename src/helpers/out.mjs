import chalk from "chalk";
import { getLabels } from "../lang/lang.mjs";
import { isJSON } from "./validation.mjs";

const labels = getLabels();

const colors = {
	BASE_03: "#002b36",
	VIOLET: "#6c71c4",
	BLUE: "#268bd2",
	ORANGE: "#cb4b16",
	RED: "#dc322f",
	GREEN: "#859900",
};

export function showHeaders(headers, title) {
	if (headers) {
		console.log(chalk.bold.hex(colors.VIOLET)(` ⦊⦊⦊ ${ title || labels.HEADERS } `));
		console.log(chalk.bold.hex(colors.VIOLET)(" ⦊⦊⦊ "), headers);
	}
}

export function showMessage(message) {
	console.log(chalk.bold.hex(colors.BLUE)(` ⟩⟩⟩ ${labels.MESSAGE} `));
	if (message && isJSON(message)) {
		console.log(chalk.bold.hex(colors.BLUE)(" ⟩⟩⟩ "), JSON.parse(message));
	} else {
		console.log(chalk.bold.hex(colors.BLUE)(" ⟩⟩⟩ "), message);
	}
}

export function showError(message, title) {
	console.log(chalk.bold.hex(colors.RED)(` !!! ${title || labels.ERROR} `));
	console.log(chalk.bold.hex(colors.RED)(" !!! "), chalk.hex(colors.RED)(message));
}

export function showWarn(payload, title) {
	console.log(chalk.bold.hex(colors.ORANGE)(` ⸙⸙⸙ ${title || labels.WARNING} `));
	if (payload && isJSON(payload)) {
		console.log(chalk.bold.hex(colors.ORANGE)(" ⸙⸙⸙ "), JSON.parse(payload));
	} else {
		console.log(chalk.bold.hex(colors.ORANGE)(" ⸙⸙⸙ "), payload);
	}
}

export function showFile(title, file) {
	console.log(
		chalk.bold.hex(colors.GREEN)(` ⟩⟩⟩ ${title} `),
		chalk.hex(colors.GREEN).underline(file)
	);
}