import { ThemedToken } from "./types.js";
import { HighlightedToken } from "../types.js";
import { TextDocument } from "../editor/textDocument.js";
//#region src/highlighter/tokenizer-types.d.ts
/** Document and callbacks owned by an editor's incremental tokenizer. */
interface DiffsEditorTokenizerOptions {
  textDocument: Pick<TextDocument, 'getText' | 'getLineText' | 'lineCount' | 'languageId' | 'version'>;
  theme: string;
  tokenizeMaxLineLength?: number;
  matchBrackets?: boolean;
  onDeferTokenize: (lines: Map<number, HighlightedToken[]>) => void;
  __debug?: boolean;
}
/** Previously emitted provisional tokens to remove before applying new tokens. */
interface RecallToken {
  recall: number;
}
interface DiffsStreamTokenizerEnqueueResult {
  recall: number;
  stable: ThemedToken[];
  unstable: ThemedToken[];
}
/** Incremental source chunks with a replaceable final line. */
interface DiffsStreamTokenizer {
  enqueue(chunk: string): DiffsStreamTokenizerEnqueueResult | Promise<DiffsStreamTokenizerEnqueueResult>;
  close(): {
    stable: ThemedToken[];
  };
  clear(): void;
  clone(): DiffsStreamTokenizer;
  dispose(): void;
}
//#endregion
export { DiffsEditorTokenizerOptions, DiffsStreamTokenizer, DiffsStreamTokenizerEnqueueResult, RecallToken };
//# sourceMappingURL=tokenizer-types.d.ts.map