export const uniq = <T>(...arr: T[][]): T[] => {
	if (!arr || arr.length === 0 || (arr.length === 1 && !arr[0])) {
		return [];
	}
	return Array.from(new Set(arr.flat()));
};
