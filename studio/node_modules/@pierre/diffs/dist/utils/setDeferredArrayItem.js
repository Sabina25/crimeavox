//#region src/utils/setDeferredArrayItem.ts
function setDeferredArrayItem(array, index, create, { retain = true } = {}) {
	let initialized = false;
	let cached;
	Object.defineProperty(array, index, {
		configurable: true,
		enumerable: true,
		get() {
			if (initialized) return cached;
			const value = create();
			if (!retain) return value;
			cached = value;
			initialized = true;
			if (Object.getOwnPropertyDescriptor(array, index)?.configurable === true) Object.defineProperty(array, index, {
				configurable: true,
				enumerable: true,
				writable: true,
				value: cached
			});
			return cached;
		},
		set(value) {
			if (Object.getOwnPropertyDescriptor(array, index)?.configurable === true) Object.defineProperty(array, index, {
				configurable: true,
				enumerable: true,
				writable: true,
				value
			});
			else if (Object.isFrozen(array)) throw new TypeError(`Cannot assign to read only array index '${index}'`);
			else {
				cached = value;
				initialized = true;
			}
		}
	});
}
//#endregion
export { setDeferredArrayItem };

//# sourceMappingURL=setDeferredArrayItem.js.map