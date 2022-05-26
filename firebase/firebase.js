import { createUserWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import {addDoc, collection, getDocs} from "firebase/firestore"
import { auth, dbData } from "./config";
export const createUser = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);
export const signUser = async (email, password) => await signInWithEmailAndPassword(auth, email, password);
export const signOutuser = async () => await signOut(auth);

export const loginWithGoogle = async () => {
    try {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    } catch (error) {
        console.log(error)
    }
}
    
export const data = async (title, select, author, image) => addDoc(collection(dbData, "baseDePrueba"), {
    title: title,
    select: select,
    author: author,
    image: image
});

export const getDatabase = async () => getDocs(collection(dbData, "baseDePrueba"));