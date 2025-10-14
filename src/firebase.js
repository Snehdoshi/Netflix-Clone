import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBMAAGMtg8TCErDikLYd_5S2ZZGMbHkBnY",
  authDomain: "netflix-clone-f039f.firebaseapp.com",
  projectId: "netflix-clone-f039f",
  storageBucket: "netflix-clone-f039f.firebasestorage.app",
  messagingSenderId: "1095351658015",
  appId: "1:1095351658015:web:602b85f8b25cc90526d72a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name , email , password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth , email , password);
    const user = res.user;
    await addDoc( collection (db,"user" ) , {
      uid: user.uid,
      name,
      authProvider: "local" , 
      email,

    });
    
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
    
  }
}
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth , email , password); 
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))


    
  }
}
const logout = () => {
  signOut(auth);
}

export {auth , db , signup , login , logout};