//#region src/utils/resolvePreferredHighlighter.ts
/**
* Undefined lets the caller use the active type or the default.
*/
function resolvePreferredHighlighter(workerManager, options) {
	return workerManager?.getPreferredHighlighter() ?? options.preferredHighlighter;
}
//#endregion
export { resolvePreferredHighlighter };

//# sourceMappingURL=resolvePreferredHighlighter.js.map