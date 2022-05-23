import { initializeApp, type FirebaseApp } from 'firebase/app';
import { enableIndexedDbPersistence, getFirestore, type Firestore } from 'firebase/firestore';
import { getPerformance } from "firebase/performance";
import {getLCP, getFID, getCLS} from 'web-vitals';

const firebaseConfig = {
	apiKey: 'AIzaSyDzODcyW4kvQKr_E-Hu-KqxQxhQuPZDNN8',
	authDomain: 'ammetake-67b65.firebaseapp.com',
	projectId: 'ammetake-67b65',
	storageBucket: 'ammetake-67b65.appspot.com',
	messagingSenderId: '55064864232',
	appId: '1:55064864232:web:f8639842d2d4ebcd06b05d'
};

const createFirestore = async (firebaseApp: FirebaseApp): Promise<Firestore> => {
	const db = getFirestore(firebaseApp);
	await enableIndexedDbPersistence(db);

	return db;
};

export const firestoreApp: FirebaseApp = initializeApp(firebaseConfig);
export const firestoreDb: Firestore | null = await createFirestore(firestoreApp);
export const firestorePerf = getPerformance(firestoreApp);

getCLS(console.log);
getFID(console.log);
getLCP(console.log);