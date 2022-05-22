import { initializeApp, type FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDzODcyW4kvQKr_E-Hu-KqxQxhQuPZDNN8',
	authDomain: 'ammetake-67b65.firebaseapp.com',
	projectId: 'ammetake-67b65',
	storageBucket: 'ammetake-67b65.appspot.com',
	messagingSenderId: '55064864232',
	appId: '1:55064864232:web:f8639842d2d4ebcd06b05d'
};

const createFirestore = async (firebaseApp: FirebaseApp): Promise<Firestore> => {
	const { getFirestore, enableIndexedDbPersistence } = await import('firebase/firestore');
	const db = getFirestore(firebaseApp);
	await enableIndexedDbPersistence(db);
	return db;
};

export const firestoreApp: FirebaseApp = initializeApp(firebaseConfig);
export const firestoreDb: Firestore | null = await createFirestore(firestoreApp);
