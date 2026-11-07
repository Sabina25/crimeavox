//#region src/utils/canUseWASM.d.ts
/**
 * Whether WebAssembly, including SIMD, can be compiled and instantiated
 * synchronously. The `highlights` and `shiki-wasm` highlighters need
 * WebAssembly, so use this to fall back to `shiki-js` in environments that lack
 * it or block it (for example, a CSP without `wasm-unsafe-eval`). SIMD is
 * required because `highlights` uses it; engines without it (such as Safari
 * before 16.4) report false. The result is cached after the first call.
 */
declare function canUseWASM(): boolean;
//#endregion
export { canUseWASM };
//# sourceMappingURL=canUseWASM.d.ts.map