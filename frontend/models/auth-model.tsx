"use server"

import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

export interface EmailAuthInput {
    username: string;
    password: string;
};

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Object} userCredential
 * @throws {Error} error
 * 
 */

export const register = async (params:EmailAuthInput): Promise<string> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, params.username, params.password);
        return userCredential.user.getIdToken();
    } catch (error) {
        throw new Error("Something went wrong!");
    };
};

export const login = async (params:EmailAuthInput): Promise<string> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, params.username, params.password);
        return userCredential.user.getIdToken();
    } catch (error) {
        throw new Error("Something went wrong!");
    };
};

export const logout = async ():Promise<string> => {
    try {
        await signOut(auth);
        return "Success";
    } catch (error) {
        throw new Error("Something went wrong!");
    };
};