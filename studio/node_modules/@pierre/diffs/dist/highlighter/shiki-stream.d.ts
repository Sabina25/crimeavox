import { ThemedToken } from "./types.js";
import { BaseStreamTokenizer } from "./stream-tokenizer.js";
import { CodeToTokensOptions, HighlighterCore } from "shiki/core";
//#region src/highlighter/shiki-stream.d.ts
declare class ShikiStreamTokenizer extends BaseStreamTokenizer {
  #private;
  private readonly highlighter;
  private readonly options;
  constructor(highlighter: HighlighterCore, options: CodeToTokensOptions);
  protected tokenizeChunk(chunk: string, stable: ThemedToken[]): {
    unstable: ThemedToken[];
    tailLength: number;
  };
  clone(): ShikiStreamTokenizer;
  protected resetSource(): void;
  protected releaseSource(): void;
}
//#endregion
export { ShikiStreamTokenizer };
//# sourceMappingURL=shiki-stream.d.ts.map