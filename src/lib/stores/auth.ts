import { readable } from 'svelte/store';
import { browser } from '$app/env';
import type { Auth, User } from 'firebase/auth';
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
			const { getAuth, onAuthStateChanged } = await import('firebase/auth');
			auth = getAuth(firestoreApp);
			unsubscribe = onAuthStateChanged(auth, set);
		}

		listen();

		return () => unsubscribe();
	});

	async function signIn(email: string, password: string) {
		const { signInWithEmailAndPassword } = await import('firebase/auth');
		await signInWithEmailAndPassword(auth, email, password);
	}

	async function signOut() {
		const { signOut } = await import('firebase/auth');
		await signOut(auth);
	}

	return {
		subscribe,
		signIn,
		signOut
	};
};

export const auth = createAuth();
