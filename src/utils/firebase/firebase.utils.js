import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

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

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch(error){
            console.log("error creating user", error.message);
        }
    }
    return userDocRef;

}  

export const createAuthUserWithEmailAndPassword = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
}