import { AttachedLanguages } from "./constants.js";
//#region src/highlighter/languages/areLanguagesAttached.ts
function areLanguagesAttached(languages, highlighter) {
	const names = Array.isArray(languages) ? languages : [languages];
	if (highlighter != null) return highlighter.hasLoadedLanguages(names);
	return names.every((name) => name === "text" || name === "ansi" || AttachedLanguages.has(name));
}
//#endregion
export { areLanguagesAttached };

//# sourceMappingURL=areLanguagesAttached.js.map