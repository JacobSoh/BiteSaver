import admin from '../config/firebase.js';

/**
 * 
 * @param {string} idToken - The Firebase Authentication ID Token
 * @returns {Promise<Object>} - Decoded token object if verification succeeds
 * @throws {Error} - If the token is invalid or verification fails
 */

const verifyToken = async ( idToken ) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        console.error("Error verifying ID token: ", error.message);
        throw new Error("Unauthorized");
    };
};

export default {
    verifyToken
}