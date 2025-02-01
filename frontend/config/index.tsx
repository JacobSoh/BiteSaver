'use server'

import assert from 'assert';
import { FirebaseOptions } from 'firebase/app';

interface ExportConfig {
    port?: string;
    host?: string;
    firebaseConfig?: FirebaseOptions;
};

const getEnv = async ():Promise<ExportConfig> => {
    const PORT = process.env.PORT as string;
    const HOST = process.env.HOST as string;
    const FB_API_KEY = process.env.FB_API_KEY as string;
    const FB_AUTH_DOMAIN = process.env.FB_AUTH_DOMAIN as string;
    const FB_PROJECT_ID = process.env.FB_PROJECT_ID as string;
    const FB_STORAGE_BUCKET = process.env.FB_STORAGE_BUCKET as string;
    const FB_MESSAGING_SENDER_ID = process.env.FB_MESSAGING_SENDER_ID as string;
    const FB_APP_ID = process.env.FB_APP_ID as string;
    const FB_MEASUREMENT_ID = process.env.FB_MEASUREMENT_ID as string;

    assert(FB_API_KEY, 'API Key is required');

    return {
        port: PORT,
        host: HOST,
        firebaseConfig:{
            apiKey: FB_API_KEY,
            authDomain: FB_AUTH_DOMAIN,
            projectId: FB_PROJECT_ID,
            storageBucket: FB_STORAGE_BUCKET,
            messagingSenderId: FB_MESSAGING_SENDER_ID,
            appId: FB_APP_ID,
            measurementId: FB_MEASUREMENT_ID
        },
    };
};

export default getEnv;