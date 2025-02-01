import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import envVar from "./index";

const config = await envVar();
export const firebase = initializeApp(config.firebaseConfig as FirebaseOptions);

export const auth = getAuth(firebase);