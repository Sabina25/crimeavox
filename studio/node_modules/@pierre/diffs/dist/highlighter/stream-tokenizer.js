//#region src/highlighter/stream-tokenizer.ts
/**
* The final line stays provisional until a line break or stream close.
* A trailing CR waits for the next chunk, which may complete a CRLF pair.
* Token offsets are absolute UTF-16 positions in the stream.
*/
var BaseStreamTokenizer = class {
	disposed = false;
	/** Stream offset of the provisional line's first character. */
	stableOffset = 0;
	unstable = [];
	pendingCarriageReturn = "";
	enqueue(chunk) {
		this.assertActive();
		chunk = this.pendingCarriageReturn + chunk;
		this.pendingCarriageReturn = chunk.endsWith("\r") ? "\r" : "";
		if (this.pendingCarriageReturn !== "") chunk = chunk.slice(0, -1);
		const recall = this.unstable.length;
		const stable = [];
		const { unstable, tailLength } = this.tokenizeChunk(chunk, stable);
		if (this.pendingCarriageReturn !== "") unstable.push({
			content: "\r",
			offset: this.stableOffset + tailLength
		});
		this.unstable = unstable;
		return {
			recall,
			stable,
			unstable
		};
	}
	/** Emit one token per line-break character and move past the line. */
	pushLineBreak(stable, lineLength, lineBreak) {
		for (let index = 0; index < lineBreak.length; index++) stable.push({
			content: lineBreak[index],
			offset: this.stableOffset + lineLength + index
		});
		this.stableOffset += lineLength + lineBreak.length;
	}
	close() {
		const stable = this.unstable;
		this.dispose();
		return { stable };
	}
	clear() {
		this.assertActive();
		this.stableOffset = 0;
		this.unstable = [];
		this.pendingCarriageReturn = "";
		this.resetSource();
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.unstable = [];
		this.releaseSource();
	}
	copyStateTo(clone) {
		clone.stableOffset = this.stableOffset;
		clone.unstable = this.unstable.slice();
		clone.pendingCarriageReturn = this.pendingCarriageReturn;
	}
	assertActive() {
		if (this.disposed) throw new Error("stream tokenizer is disposed");
	}
};
//#endregion
export { BaseStreamTokenizer };

//# sourceMappingURL=stream-tokenizer.js.map