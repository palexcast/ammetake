import type { PottyEvent } from '../types/potty-event';
import { type Readable, readable } from 'svelte/store';
import type { DocumentReference } from 'firebase/firestore';
import type { Unsubscribe } from '@firebase/util';
import { browser } from '$app/env';
import { nullify, toDate } from '../utils/firestore-utils';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { EventType } from '../types/basic-event';
import {
	addDoc,
	collection,
	getFirestore,
	limit,
	onSnapshot,
	orderBy,
	query,
	where
} from 'firebase/firestore';

const collectionName = 'events';

const convert = (doc: QueryDocumentSnapshot): PottyEvent => {
	const data = doc.data();
	return {
		id: doc.id,
		...data,
		created: toDate(data.created)
	} as PottyEvent;
};

const add = async (event: PottyEvent): Promise<DocumentReference | null> => {
	if (!browser) {
		return null;
	}
	const { firestoreApp } = await import('./firestore');
	const db = getFirestore(firestoreApp);
	try {
		return await addDoc(collection(db, collectionName), nullify(event));
	} catch (e) {
		console.error('Error adding Potty Event: ', e);
		return null;
	}
};

const all: Readable<PottyEvent[]> = readable<PottyEvent[]>([], (set) => {
	let unsubscribe: Unsubscribe = () => void 0;

	async function listen() {
		const { firestoreDb } = await import('./firestore');
		if (!firestoreDb) {
			set([]);
			return;
		}
		const q = query(
			collection(firestoreDb, collectionName),
			where('eventType', '==', EventType.Potty)
		);
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const events = querySnapshot.docs.map((doc) => convert(doc));
			set(events);
		});
	}

	listen();

	return () => unsubscribe();
});

const previous: Readable<PottyEvent | null> = readable<PottyEvent | null>(null, (set) => {
	let unsubscribe: Unsubscribe = () => void 0;

	async function listen() {
		const { firestoreDb } = await import('./firestore');
		if (!firestoreDb) {
			set(null);
			return;
		}
		const q = query(
			collection(firestoreDb, collectionName),
			where('eventType', '==', EventType.Potty),
			orderBy('created', 'desc'),
			limit(1)
		);
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const events = querySnapshot.docs.map((doc) => convert(doc));
			set(events?.[0] ?? null);
		});
	}

	listen();

	return () => unsubscribe();
});

const createStore = () => {
	return {
		add,
		all,
		previous
	};
};

export const potty = createStore();
