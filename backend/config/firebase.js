// Import the functions you need from the SDKs you need
import admin from 'firebase-admin';
import config from './index.js';

export default admin.initializeApp({
    credential: admin.credential.cert(config.fbConfig),
    databaseURL: "https://bitesaver-28b87-default-rtdb.asia-southeast1.firebasedatabase.app"
});