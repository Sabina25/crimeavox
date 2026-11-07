import { createDiffsThemeResolver } from "./themeResolver.js";
//#region src/highlighter/themes/cleanUpResolvedThemes.ts
/** Clear cached themes while preserving custom registrations for future instances. */
function cleanUpResolvedThemes(backend) {
	for (const name of backend == null ? [
		"shiki-js",
		"shiki-wasm",
		"highlights"
	] : [backend]) createDiffsThemeResolver(name).clearResolvedThemes();
}
//#endregion
export { cleanUpResolvedThemes };

//# sourceMappingURL=cleanUpResolvedThemes.js.map