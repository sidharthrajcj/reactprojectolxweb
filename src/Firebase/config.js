import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyDuWE4DsgG5931qnI47Xjngq5xTsQ2BOC4",
    authDomain: "reactdemo-4a33d.firebaseapp.com",
    projectId: "reactdemo-4a33d",
    storageBucket: "reactdemo-4a33d.appspot.com",
    messagingSenderId: "413716305798",
    appId: "1:413716305798:web:762e64f5b8c3fea28d7e07",
    measurementId: "G-H97G3S70VS"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);    
export const storage = getStorage(app);
export default app;