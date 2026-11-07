import { unwrapDefault } from "./unwrapDefault.js";
//#region src/modules/createTheme.ts
function createTheme({ name, load, colorScheme, collection, displayName }) {
	return {
		name,
		colorScheme,
		collection,
		displayName,
		load: normalizingLoader(load)
	};
}
function normalizingLoader(loader) {
	return async () => {
		const [raw, { normalizeTheme }] = await Promise.all([loader(), import("shiki/core")]);
		return normalizeTheme(unwrapDefault(raw));
	};
}
//#endregion
export { createTheme };

//# sourceMappingURL=createTheme.js.map