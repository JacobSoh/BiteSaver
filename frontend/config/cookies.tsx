"use server";
import { cookies } from 'next/headers';

export const getCookie = async (cookieName: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(cookieName);
};

export const deleteCookie = async (cookieName: string) => {
    const cookieStore = await cookies();
    return cookieStore.delete(cookieName);
};

export const setCookie = async (cookieName: string, value: any) => {
    const cookieStore = await cookies();
    return cookieStore.set({
        name: cookieName,
        value: value,
        httpOnly: true,
        path: '/',
        sameSite: true,
        maxAge: 60 * 60
    });
};