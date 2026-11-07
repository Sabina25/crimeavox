import "../constants.js";
//#region src/highlighter/highlighterType.ts
let activeType;
let holds = 0;
var HighlighterDisposedError = class extends Error {
	constructor() {
		super("Highlighter is disposed");
		this.name = "HighlighterDisposedError";
	}
};
function getHighlighterType() {
	return activeType;
}
function resolveHighlighterType(type) {
	return type ?? activeType ?? "shiki-js";
}
function assertHighlighterType(type) {
	if (activeType != null && activeType !== type) throw new Error(`Cannot load the "${type}" highlighter while "${activeType}" is in use. Only one highlighter type can be active at a time; dispose every "${activeType}" instance (disposeHighlighter() disposes the shared one) before switching.`);
}
function acquireHighlighterType(type) {
	assertHighlighterType(type);
	activeType = type;
	holds++;
}
function releaseHighlighterType() {
	holds--;
	if (holds === 0) activeType = void 0;
}
//#endregion
export { HighlighterDisposedError, acquireHighlighterType, assertHighlighterType, getHighlighterType, releaseHighlighterType, resolveHighlighterType };

//# sourceMappingURL=highlighterType.js.map