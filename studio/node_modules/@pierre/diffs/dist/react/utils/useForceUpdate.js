import { useState, useSyncExternalStore } from "react";
//#region src/react/utils/useForceUpdate.ts
function useForceUpdate() {
	const [store] = useState(() => {
		let version = 0;
		let listener;
		return {
			getSnapshot: () => version,
			subscribe(next) {
				listener = next;
				return () => {
					listener = void 0;
				};
			},
			forceUpdate() {
				version++;
				listener?.();
			}
		};
	});
	useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
	return store.forceUpdate;
}
//#endregion
export { useForceUpdate };

//# sourceMappingURL=useForceUpdate.js.map