import chalk from "chalk";

export function isJSON(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function getStrUnderline(str) {
	const BORDER = 2;
	return Array(str.length - BORDER).fill("-").join("");
}

export function showHeaders(headers, title) {
	title = title || "[MESSAGE HEADERS]";
	console.log(chalk.bgGreen.bold.white(title));
	console.log(chalk.green(` ${getStrUnderline(title)} `));
	console.log(headers);
	console.log(chalk.green(` ${getStrUnderline(title)} `));
	console.log();
}

export function showMessage(message, title) {
	title = title || "[MESSAGE BODY]";
	if (isJSON(message)) {
		console.log(chalk.bgBlue.bold.white(title));
		console.log(chalk.blue(` ${getStrUnderline(title)} `));
		console.log(JSON.parse(message));
	} else {
		console.log(chalk.bgBlue.bold.white((`${title}:`)), " ", message);
	}
	console.log(chalk.blue(` ${getStrUnderline(title)} `));
	console.log();
}