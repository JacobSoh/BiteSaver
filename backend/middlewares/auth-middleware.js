import authModel from "../models/auth-model.js";

export const verifyToken = async (req, res, next) => {
    const idToken = req.cookies.authToken;

    if (!idToken) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    };

    try {
        const userCredential = await authModel.verifyToken(idToken);
        req.user = userCredential;
        next();
    } catch (error) {
        return res.status(400).json({ 
            status: 'error',
            message: error.message,
        });
    };
};