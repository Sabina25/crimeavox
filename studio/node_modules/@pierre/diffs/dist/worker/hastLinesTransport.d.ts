import { ElementContent } from "../node_modules/.pnpm/@types_hast@3.0.4/node_modules/@types/hast/index.js";
//#region src/worker/hastLinesTransport.d.ts
interface EncodedHastLines {
  ops: Int32Array<ArrayBuffer>;
  offsets: Uint32Array<ArrayBuffer>;
  strings: string[];
  text: string;
  extras: unknown[];
}
declare function encodeHastLines(lines: ElementContent[]): EncodedHastLines;
declare function decodeHastLines(encoded: EncodedHastLines | ElementContent[]): ElementContent[];
//#endregion
export { EncodedHastLines, decodeHastLines, encodeHastLines };
//# sourceMappingURL=hastLinesTransport.d.ts.map