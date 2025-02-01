"use server"

import {
    login as AuthModelLogin,
    register as AuthModelRegister,
    logout as AuthModelLogout,
    EmailAuthInput
} from '@/models/auth-model';

import { setCookie, deleteCookie } from '@/config/cookies';

export const register = async (params: EmailAuthInput): Promise<string> => {
    try {
        const idToken = await AuthModelRegister(params);

        if (idToken) {
            await setCookie('authToken', idToken);
            return "Success";
        } else {
            return 'Failed';
        };
    } catch (error) {
        if (error instanceof Error) {
            // If error is an instance of the Error class
            return 'error';
        };
        return 'error';
    };
};

export const login = async (params: EmailAuthInput): Promise<string> => {
    try {
        const idToken = await AuthModelLogin(params);
        if (idToken) {
            await setCookie('authToken', idToken);
            return "Success";
        } else {
            return 'Failed';
        };
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        };
        return 'Unexpected error'
    };
};

export const logout = async ():Promise<string> => {
    try {
        const result = await AuthModelLogout();
        
        if (result == "Success") {
            await deleteCookie("authToken");
            return "Success";
        } else {
            return 'Failed';
        };
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        };
        return 'Unexpected error';
    };
};