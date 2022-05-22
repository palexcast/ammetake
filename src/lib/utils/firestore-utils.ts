import type { Timestamp } from 'firebase/firestore';

export const toDate = (timestamp: Timestamp | null | undefined): Date | null | undefined => {
	return timestamp?.toDate();
};

export const nullify = <T>(obj: T): T => {
	const mapped = Object.entries(obj).map(([key, value]: unknown[]) => {
		if (value === undefined) {
			return [key, null];
		}
		return [key, value];
	});
	return Object.fromEntries(mapped) as unknown as T;
};
