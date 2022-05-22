import { type Readable, readable } from 'svelte/store';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import type { Unsubscribe } from '@firebase/util';
import { toDate } from '../utils/firestore-utils';
import type { BabyEvent } from '../types/basic-event';

const collectionName = 'events';

const convert = (doc: QueryDocumentSnapshot): BabyEvent => {
	const data = doc.data();
	return {
		id: doc.id,
		...data,
		created: toDate(data.created),
		stopped: toDate(data.stopped),
		startedSecond: toDate(data.startedSecond),
		stoppedSecond: toDate(data.stoppedSecond)
	} as BabyEvent;
};

const all: Readable<BabyEvent[]> = readable<BabyEvent[]>([], (set) => {
	let unsubscribe: Unsubscribe = () => void 0;

	async function listen() {
		const { firestoreDb } = await import('./firestore');
		if (!firestoreDb) {
			set([]);
			return;
		}
		const { collection, query, onSnapshot } = await import('firebase/firestore');
		const q = query(collection(firestoreDb, collectionName));
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const events = querySnapshot.docs.map((doc) => convert(doc));
			set(events);
		});
	}

	listen();

	return () => unsubscribe();
});

const createStore = () => {
	return {
		all
	};
};

export const events = createStore();
