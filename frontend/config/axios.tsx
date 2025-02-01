'use client'

import axios from 'axios';

export type VerifyTokenInput = {
    idToken: string
}

const axiosClient = axios.create({
    baseURL: "http://localhost:4444/",
    withCredentials: true,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
    },
});

export const getData = async (endpoint: string):Promise<any> => {
    try {
        const response = await axiosClient.get(endpoint);
        return response.data;
    } catch (e) {
        throw e;
    };
};

export const postImgData = async (endpoint: string, body: FormData):Promise<any> => {
    try {
        const response = await axiosClient.post(endpoint, body, {
            withCredentials: true,
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response.data;
    } catch (e) {
        throw e;
    };
};

export const postData = async (endpoint: string, body: object):Promise<any> => {
    try {
        const response = await axiosClient.post(endpoint, {...body}, {
            withCredentials: true,
        });
        return response.data;
    } catch (e) {
        throw e;
    };
};