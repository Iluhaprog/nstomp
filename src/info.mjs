import { createRequire } from "module";

const require = createRequire(import.meta.url);
const info = require("../package.json");

export default info;