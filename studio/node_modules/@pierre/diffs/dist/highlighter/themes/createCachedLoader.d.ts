//#region src/highlighter/themes/createCachedLoader.d.ts
declare function createCachedLoader<T extends object>(loader: () => Promise<T>): () => T | Promise<T>;
//#endregion
export { createCachedLoader };
//# sourceMappingURL=createCachedLoader.d.ts.map