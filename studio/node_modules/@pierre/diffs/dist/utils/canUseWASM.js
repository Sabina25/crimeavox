//#region src/utils/canUseWASM.ts
let canUseWASMResult;
/**
* Whether WebAssembly, including SIMD, can be compiled and instantiated
* synchronously. The `highlights` and `shiki-wasm` highlighters need
* WebAssembly, so use this to fall back to `shiki-js` in environments that lack
* it or block it (for example, a CSP without `wasm-unsafe-eval`). SIMD is
* required because `highlights` uses it; engines without it (such as Safari
* before 16.4) report false. The result is cached after the first call.
*/
function canUseWASM() {
	return canUseWASMResult ??= probeWASM();
}
function probeWASM() {
	try {
		if (typeof WebAssembly !== "object") return false;
		const wasmModule = new WebAssembly.Module(new Uint8Array([
			0,
			97,
			115,
			109,
			1,
			0,
			0,
			0,
			1,
			5,
			1,
			96,
			0,
			1,
			123,
			3,
			2,
			1,
			0,
			10,
			10,
			1,
			8,
			0,
			65,
			0,
			253,
			15,
			253,
			98,
			11
		]));
		new WebAssembly.Instance(wasmModule);
		return true;
	} catch {
		return false;
	}
}
//#endregion
export { canUseWASM };

//# sourceMappingURL=canUseWASM.js.map