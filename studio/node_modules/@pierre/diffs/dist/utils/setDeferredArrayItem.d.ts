//#region src/utils/setDeferredArrayItem.d.ts
declare function setDeferredArrayItem<T>(array: T[], index: number, create: () => T, { retain }?: {
  retain?: boolean;
}): void;
//#endregion
export { setDeferredArrayItem };
//# sourceMappingURL=setDeferredArrayItem.d.ts.map