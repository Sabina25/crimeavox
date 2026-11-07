import { formatCSSVariablePrefix } from "../../utils/formatCSSVariablePrefix.js";
import { createCSSVariablesTheme } from "./createCSSVariablesTheme.js";
import { registerCustomTheme } from "./registerCustomTheme.js";
//#region src/highlighter/themes/registerCustomCSSVariableTheme.ts
function registerCustomCSSVariableTheme(name, variableDefaults, fontStyle = false) {
	const theme = createCSSVariablesTheme({
		name,
		variablePrefix: formatCSSVariablePrefix("global"),
		variableDefaults,
		fontStyle
	});
	registerCustomTheme(name, () => Promise.resolve(theme), "diffs");
}
//#endregion
export { registerCustomCSSVariableTheme };

//# sourceMappingURL=registerCustomCSSVariableTheme.js.map