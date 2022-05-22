import { readable } from 'svelte/store';
import { browser } from '$app/env';
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	type Auth,
	type User
} from 'firebase/auth';
import type { Unsubscribe } from '@firebase/util';

const createAuth = () => {
	let auth: Auth;

	const { subscribe } = readable<User | null>(undefined, (set) => {
		let unsubscribe: Unsubscribe = () => void 0;

		async function listen() {
			if (!browser) {
				set(null);
				return;
			}
			const { firestoreApp } = await import('./firestore');
			auth = getAuth(firestoreApp);
			unsubscribe = onAuthStateChanged(auth, set);
		}

		listen();

		return () => unsubscribe();
	});

	async function signIn(email: string, password: string) {
		await signInWithEmailAndPassword(auth, email, password);
	}

	return {
		subscribe,
		signIn,
		signOut: async () => await signOut(auth)
	};
};

export const auth = createAuth();
