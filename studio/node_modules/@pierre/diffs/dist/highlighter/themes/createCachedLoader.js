//#region src/highlighter/themes/createCachedLoader.ts
function createCachedLoader(loader) {
	let cached;
	return () => cached ??= loader().then((loaded) => {
		cached = loaded;
		return loaded;
	}, (error) => {
		cached = void 0;
		throw error;
	});
}
//#endregion
export { createCachedLoader };

//# sourceMappingURL=createCachedLoader.js.map