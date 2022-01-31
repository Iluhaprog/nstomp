import chalk from "chalk";
import { getLabels } from "../lang/lang.mjs";
import { isJSON } from "./validation.mjs";

const labels = getLabels();

export function showHeaders(headers, title) {
	if (headers) {
		console.log(chalk.bgMagenta.bold.whiteBright(` ⦊⦊⦊ ${ title || labels.HEADERS } `));
		console.log(chalk.bgMagenta.bold.whiteBright(" ⦊⦊⦊ "), headers);
	}
}

export function showMessage(message) {
	console.log(chalk.bgBlueBright.bold.whiteBright(` ⟩⟩⟩ ${labels.MESSAGE} `));
	if (message && isJSON(message)) {
		console.log(chalk.bgBlueBright.bold.whiteBright(" ⟩⟩⟩ "), JSON.parse(message));
	} else {
		console.log(chalk.bgBlueBright.bold.whiteBright(" ⟩⟩⟩ "), message);
	}
}

export function showError(message, title) {
	console.log(chalk.bgRed.bold.whiteBright(` !!! ${title || labels.ERROR} `));
	console.log(chalk.bgRed.bold.whiteBright(" !!! "), chalk.redBright(message));
}

export function showWarn(payload, title) {
	console.log(chalk.bgHex("#CD732A").bold.whiteBright(` ⸙⸙⸙ ${title || labels.WARNING} `));
	if (payload && isJSON(payload)) {
		console.log(chalk.bgHex("#CD732A").bold.whiteBright(" ⸙⸙⸙ "), JSON.parse(payload));
	} else {
		console.log(chalk.bgHex("#CD732A").bold.whiteBright(" ⸙⸙⸙ "), payload);
	}
}