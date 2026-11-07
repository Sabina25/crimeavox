import { appendItems } from "../utils/appendItems.js";
import { BaseStreamTokenizer } from "./stream-tokenizer.js";
import { LiveTokenizer } from "@pierre/highlights";
//#region src/highlighter/highlights-stream.ts
const TRIM_LINE_COUNT = 1024;
const DOCUMENT_START = {
	line: 0,
	character: 0
};
/** Keeps the unfinished line editable so new chunks can recall provisional tokens. */
var HighlightsStreamTokenizer = class HighlightsStreamTokenizer extends BaseStreamTokenizer {
	options;
	#tokenizer;
	#trimLineCount = TRIM_LINE_COUNT;
	constructor(options) {
		super();
		this.options = options;
		this.#tokenizer = new LiveTokenizer(options);
	}
	tokenizeChunk(chunk, stable) {
		const lineBreaks = [...chunk.matchAll(/\r\n|\r|\n/g)];
		const startLine = this.#tokenizer.lineCount - 1;
		const position = {
			line: startLine,
			character: this.#tokenizer.getLineLength(startLine)
		};
		this.#tokenizer.applyEdits([{
			range: {
				start: position,
				end: position
			},
			newText: chunk
		}]);
		const lastLine = this.#tokenizer.lineCount - 1;
		let unstable = [];
		for (let line = startLine; line <= lastLine; line++) {
			const { tokens } = this.#tokenizer.getLineTokens(line);
			for (const token of tokens) token.offset += this.stableOffset;
			if (line < lastLine) {
				appendItems(stable, tokens);
				this.pushLineBreak(stable, this.#tokenizer.getLineLength(line), lineBreaks[line - startLine][0]);
			} else unstable = tokens;
		}
		const tailLength = this.#tokenizer.getLineLength(lastLine);
		if (lastLine > this.#trimLineCount) {
			const text = this.#tokenizer.getText();
			const { lineChanges } = this.#tokenizer.applyEdits([{
				range: {
					start: DOCUMENT_START,
					end: {
						line: lastLine - 1,
						character: 0
					}
				},
				newText: ""
			}]);
			if (lineChanges.every((change) => change.newEndLine <= 1)) this.#trimLineCount = TRIM_LINE_COUNT;
			else {
				const keptLength = this.#tokenizer.getText().length;
				this.#tokenizer.applyEdits([{
					range: {
						start: DOCUMENT_START,
						end: DOCUMENT_START
					},
					newText: text.slice(0, text.length - keptLength)
				}]);
				this.#trimLineCount = lastLine * 2;
			}
		}
		return {
			unstable,
			tailLength
		};
	}
	clone() {
		this.assertActive();
		const clone = new HighlightsStreamTokenizer(this.options);
		clone.#tokenizer.reset(this.#tokenizer.getText());
		this.copyStateTo(clone);
		return clone;
	}
	resetSource() {
		this.#tokenizer.reset("");
		this.#trimLineCount = TRIM_LINE_COUNT;
	}
	releaseSource() {
		this.#tokenizer.dispose();
	}
};
//#endregion
export { HighlightsStreamTokenizer };

//# sourceMappingURL=highlights-stream.js.map