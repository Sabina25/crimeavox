//#region src/shiki-stream/stream.ts
/**
* Create a transform stream that takes code chunks and emits themed tokens.
*/
var CodeToTokenTransformStream = class extends TransformStream {
	tokenizer;
	options;
	constructor(options) {
		const tokenizer = options.highlighter.createStreamTokenizer(options);
		const { allowRecalls = false } = options;
		super({
			async transform(chunk, controller) {
				try {
					const { stable, unstable: buffer, recall } = await tokenizer.enqueue(chunk);
					if (allowRecalls && recall > 0) controller.enqueue({ recall });
					for (const token of stable) controller.enqueue(token);
					if (allowRecalls) for (const token of buffer) controller.enqueue(token);
				} catch (error) {
					tokenizer.dispose();
					throw error;
				}
			},
			flush(controller) {
				try {
					const { stable } = tokenizer.close();
					if (!allowRecalls) for (const token of stable) controller.enqueue(token);
				} finally {
					tokenizer.dispose();
				}
			},
			cancel() {
				tokenizer.dispose();
			}
		});
		this.tokenizer = tokenizer;
		this.options = options;
	}
};
//#endregion
export { CodeToTokenTransformStream };

//# sourceMappingURL=stream.js.map