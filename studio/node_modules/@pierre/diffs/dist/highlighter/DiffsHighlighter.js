import { HighlighterDisposedError, acquireHighlighterType, releaseHighlighterType } from "./highlighterType.js";
import { tokensToHtml } from "../utils/tokensToHtml.js";
//#region src/highlighter/DiffsHighlighter.ts
/**
* A different highlighter type cannot load in this thread until every
* instance of the current type is disposed.
*/
var DiffsHighlighter = class {
	name;
	themeResolver;
	disposed = false;
	constructor(name, themeResolver) {
		this.name = name;
		this.themeResolver = themeResolver;
		acquireHighlighterType(name);
	}
	codeToHtml(code, options) {
		return tokensToHtml(code, this.codeToTokens(code, options), options, this.name === "highlights");
	}
	get isDisposed() {
		return this.disposed;
	}
	/**
	* Disposed instances cannot be reused.
	*/
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.releaseResources();
		releaseHighlighterType();
	}
	assertNotDisposed() {
		if (this.disposed) throw new HighlighterDisposedError();
	}
};
//#endregion
export { DiffsHighlighter };

//# sourceMappingURL=DiffsHighlighter.js.map