import { DiffsStreamTokenizer, DiffsStreamTokenizerEnqueueResult } from "./tokenizer-types.js";
import { ThemedToken } from "./types.js";
//#region src/highlighter/stream-tokenizer.d.ts
/**
 * The final line stays provisional until a line break or stream close.
 * A trailing CR waits for the next chunk, which may complete a CRLF pair.
 * Token offsets are absolute UTF-16 positions in the stream.
 */
declare abstract class BaseStreamTokenizer implements DiffsStreamTokenizer {
  protected disposed: boolean;
  /** Stream offset of the provisional line's first character. */
  protected stableOffset: number;
  protected unstable: ThemedToken[];
  protected pendingCarriageReturn: string;
  enqueue(chunk: string): DiffsStreamTokenizerEnqueueResult;
  /**
   * Append completed lines to stable, using pushLineBreak for their endings.
   * Return the unfinished line's tokens and UTF-16 length.
   */
  protected abstract tokenizeChunk(chunk: string, stable: ThemedToken[]): {
    unstable: ThemedToken[];
    tailLength: number;
  };
  /** Emit one token per line-break character and move past the line. */
  protected pushLineBreak(stable: ThemedToken[], lineLength: number, lineBreak: string): void;
  close(): {
    stable: ThemedToken[];
  };
  clear(): void;
  abstract clone(): DiffsStreamTokenizer;
  dispose(): void;
  protected copyStateTo(clone: BaseStreamTokenizer): void;
  protected assertActive(): void;
  /** Forget the provisional line and any lexer state. */
  protected abstract resetSource(): void;
  protected abstract releaseSource(): void;
}
//#endregion
export { BaseStreamTokenizer };
//# sourceMappingURL=stream-tokenizer.d.ts.map