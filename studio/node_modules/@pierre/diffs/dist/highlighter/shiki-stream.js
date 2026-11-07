import { appendItems } from "../utils/appendItems.js";
import { BaseStreamTokenizer } from "./stream-tokenizer.js";
//#region src/highlighter/shiki-stream.ts
var ShikiStreamTokenizer = class ShikiStreamTokenizer extends BaseStreamTokenizer {
	highlighter;
	options;
	#tail = "";
	#grammarState;
	constructor(highlighter, options) {
		super();
		this.highlighter = highlighter;
		this.options = options;
	}
	tokenizeChunk(chunk, stable) {
		const chunkLines = (this.#tail + chunk).split(/(\r\n|\r|\n)/);
		let unstable = [];
		for (let i = 0; i < chunkLines.length; i += 2) {
			const line = chunkLines[i];
			const result = this.highlighter.codeToTokens(line, {
				...this.options,
				grammarState: this.#grammarState
			});
			const tokens = result.tokens[0].map((token) => ({
				...token,
				offset: token.offset + this.stableOffset
			}));
			if (i + 1 < chunkLines.length) {
				appendItems(stable, tokens);
				this.pushLineBreak(stable, line.length, chunkLines[i + 1]);
				this.#grammarState = result.grammarState;
			} else {
				unstable = tokens;
				this.#tail = line;
			}
		}
		return {
			unstable,
			tailLength: this.#tail.length
		};
	}
	clone() {
		this.assertActive();
		const clone = new ShikiStreamTokenizer(this.highlighter, this.options);
		this.copyStateTo(clone);
		clone.#tail = this.#tail;
		clone.#grammarState = this.#grammarState;
		return clone;
	}
	resetSource() {
		this.#tail = "";
		this.#grammarState = void 0;
	}
	releaseSource() {
		this.resetSource();
	}
};
//#endregion
export { ShikiStreamTokenizer };

//# sourceMappingURL=shiki-stream.js.map