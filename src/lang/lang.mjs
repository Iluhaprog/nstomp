import { enUS } from "./en.mjs";

const defaultLanguage = "en_US";

const content = {
	"en_US": enUS,
};


const env = process.env;
const language = (env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES || defaultLanguage).split(".")[0];

export function getDescription() {
	return content[language].description;
}

export function getMessages() {
	return content[language].defaultMessages;
}

export function getLabels() {
	return content[language].labels;
}