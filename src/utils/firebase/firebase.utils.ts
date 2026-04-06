import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, onAuthStateChanged,
    User,
    NextOrObserver} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs,
    DocumentReference, 
    DocumentData,
} from 'firebase/firestore'
import { Category } from '../../store/categories/catergory-types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDlwnYcZ92jpLJ4-dJRWHzyQOmEME5ZQc",
  authDomain: "crwn-clothing-db-4fb67.firebaseapp.com",
  projectId: "crwn-clothing-db-4fb67",
  storageBucket: "crwn-clothing-db-4fb67.firebasestorage.app",
  messagingSenderId: "543032944078",
  appId: "1:543032944078:web:84eb08cee2a8ee720bb79f"
};

// Initialize Firebase
const firbaseApp = initializeApp(firebaseConfig);
const googleProvider =  new GoogleAuthProvider();


googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async <T extends {title: string}>(
    collectionKey: string, 
    objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef =  doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map(docSnapshot => docSnapshot.data() as Category);
}

type AdditionalInformation = {
    displayName?: string;
}

export const createUserDocumentFromAuth = async (userAuth: User,  
    additionalInformation: AdditionalInformation = {}): 
  Promise<DocumentReference<DocumentData, DocumentData>> => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {displayName, email, createdAt,  ...additionalInformation });
        } catch(error: unknown){
            if(error instanceof Error)
            console.log("error creating user", error.message);
        }
    }
    return userDocRef;

}  

export const createAuthUserWithEmailAndPassword = async (email:string, password:string) => {
        return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithAuthEmailAndPassword = async (email:string, password:string) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback:NextOrObserver<User>) => onAuthStateChanged(auth, callback);
