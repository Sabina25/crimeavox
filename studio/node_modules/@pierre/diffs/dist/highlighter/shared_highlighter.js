import { HighlighterDisposedError, acquireHighlighterType, getHighlighterType, releaseHighlighterType, resolveHighlighterType } from "./highlighterType.js";
import { cleanUpResolvedLanguages } from "./languages/cleanUpResolvedLanguages.js";
import { areThemesAttached } from "./themes/areThemesAttached.js";
import { cleanUpResolvedThemes } from "./themes/cleanUpResolvedThemes.js";
//#region src/highlighter/shared_highlighter.ts
let highlighter;
/**
* Creates an instance the caller must dispose. Defaults to the active type
* or DEFAULT_HIGHLIGHTER; rejects if a different type is already active.
*/
async function createHighlighter(type) {
	const resolvedType = resolveHighlighterType(type);
	acquireHighlighterType(resolvedType);
	try {
		if (resolvedType === "highlights") {
			const { HighlightsHighlighter } = await import("./backends/highlights.js");
			return new HighlightsHighlighter();
		}
		const { ShikiHighlighter } = await import("./backends/shiki.js");
		return await ShikiHighlighter.create(resolvedType);
	} finally {
		releaseHighlighterType();
	}
}
async function getSharedHighlighter({ themes, langs, preferredHighlighter }) {
	dropDisposedHighlighter();
	const cached = highlighter ??= createHighlighter(getHighlighterType() ?? preferredHighlighter);
	let instance;
	try {
		instance = await cached;
	} catch (error) {
		if (highlighter === cached) highlighter = void 0;
		throw error;
	}
	if (highlighter === cached) highlighter = instance;
	await Promise.all([instance.themeResolver.resolveThemes(themes), instance.loadLanguages(langs)]);
	if (instance.isDisposed) throw new HighlighterDisposedError();
	return instance;
}
function dropDisposedHighlighter() {
	if (highlighter != null && !("then" in highlighter) && highlighter.isDisposed) highlighter = void 0;
}
function isHighlighterLoaded() {
	dropDisposedHighlighter();
	return highlighter != null && !("then" in highlighter);
}
/**
* Returns undefined if the theme or language is not loaded.
*/
function getHighlighterIfLoaded({ theme, lang, langs } = {}) {
	dropDisposedHighlighter();
	const instance = highlighter;
	if (instance == null || "then" in instance || theme != null && !areThemesAttached(theme, instance) || (lang != null || langs != null) && !instance.hasLoadedLanguages([...lang != null ? [lang] : [], ...langs ?? []])) return;
	return instance;
}
function isHighlighterLoading() {
	return highlighter != null && "then" in highlighter;
}
function isHighlighterNull() {
	dropDisposedHighlighter();
	return highlighter == null;
}
async function preloadHighlighter(options) {
	await getSharedHighlighter(options);
}
/**
* Disposes an already loaded shared instance synchronously and clears caches.
* Instances from createHighlighter() must be disposed separately before
* switching types.
*/
async function disposeHighlighter() {
	const cached = highlighter;
	highlighter = void 0;
	cleanUpResolvedLanguages();
	cleanUpResolvedThemes();
	if (cached != null && "then" in cached) (await cached.catch(() => void 0))?.dispose();
	else cached?.dispose();
}
//#endregion
export { HighlighterDisposedError, createHighlighter, disposeHighlighter, getHighlighterIfLoaded, getHighlighterType, getSharedHighlighter, isHighlighterLoaded, isHighlighterLoading, isHighlighterNull, preloadHighlighter };

//# sourceMappingURL=shared_highlighter.js.map