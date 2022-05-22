import { type Readable, readable } from 'svelte/store';
import type { DocumentReference, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Unsubscribe } from '@firebase/util';
import type { FeedingEvent } from '../types/feeding-event';
import { browser } from '$app/env';
import { nullify, toDate } from '../utils/firestore-utils';
import { EventType } from '../types/basic-event';

const collectionName = 'events';

const convert = (doc: QueryDocumentSnapshot): FeedingEvent => {
	const data = doc.data();
	return {
		id: doc.id,
		...data,
		created: toDate(data.created),
		stopped: toDate(data.stopped),
		startedSecond: toDate(data.startedSecond),
		stoppedSecond: toDate(data.stoppedSecond)
	} as FeedingEvent;
};

const add = async (event: FeedingEvent): Promise<DocumentReference | null> => {
	if (!browser) {
		return null;
	}
	const { firestoreApp } = await import('./firestore');
	const { getFirestore, collection, addDoc } = await import('firebase/firestore');
	const db = getFirestore(firestoreApp);
	try {
		return await addDoc(collection(db, collectionName), nullify(event));
	} catch (e) {
		console.error('Error adding Feeding Event: ', e);
		return null;
	}
};

const update = async (event: FeedingEvent): Promise<void> => {
	if (!browser) {
		return;
	}
	const { firestoreApp } = await import('./firestore');
	const { getFirestore, doc, updateDoc } = await import('firebase/firestore');
	const db = getFirestore(firestoreApp);
	try {
		const docRef = doc(db, collectionName, event.id as string);
		const eventWithoutId = nullify({ ...event });
		delete eventWithoutId.id;
		await updateDoc(docRef, eventWithoutId);
	} catch (e) {
		console.error('Error adding Feeding Event: ', e);
	}
};

const all: Readable<FeedingEvent[]> = readable<FeedingEvent[]>([], (set) => {
	let unsubscribe: Unsubscribe = () => void 0;

	async function listen() {
		const { firestoreDb } = await import('./firestore');
		if (!firestoreDb) {
			set([]);
			return;
		}
		const { collection, query, onSnapshot, where } = await import('firebase/firestore');
		const q = query(
			collection(firestoreDb, collectionName),
			where('eventType', '==', EventType.Feeding)
		);
		unsubscribe = onSnapshot(q, (querySnapshot) => {
			const events = querySnapshot.docs.map((doc) => convert(doc));
			set(events);
		});
	}

	listen();

	return () => unsubscribe();
});

const previous: Readable<FeedingEvent | null> = readable<FeedingEvent | null>(null, (set) => {
	let unsubscribe: Unsubscribe = () => void 0;

	async function listen() {
		const { firestoreDb } = await import('./firestore');
		if (!firestoreDb) {
			set(null);
			return;
		}
		const { collection, query, onSnapshot, orderBy, where, limit } = await import(
			'firebase/firestore'
		);
		const q = query(
			collection(firestoreDb, collectionName),
			where('eventType', '==', EventType.Feeding),
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
		update,
		all,
		previous
	};
};

export const feeding = createStore();
