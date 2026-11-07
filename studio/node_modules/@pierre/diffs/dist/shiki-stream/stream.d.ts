import { DiffsStreamTokenizer, RecallToken } from "../highlighter/tokenizer-types.js";
import { ThemedToken } from "../highlighter/types.js";
import { CodeToTokenTransformStreamOptions } from "./types.js";
//#region src/shiki-stream/stream.d.ts
/**
 * Create a transform stream that takes code chunks and emits themed tokens.
 */
declare class CodeToTokenTransformStream extends TransformStream<string, ThemedToken | RecallToken> {
  readonly tokenizer: DiffsStreamTokenizer;
  readonly options: CodeToTokenTransformStreamOptions;
  constructor(options: CodeToTokenTransformStreamOptions);
}
//#endregion
export { CodeToTokenTransformStream };
//# sourceMappingURL=stream.d.ts.map