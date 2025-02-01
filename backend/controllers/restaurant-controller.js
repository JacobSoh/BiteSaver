import restaurantModel from '../models/restaurant-model.js';

const handleReturns = async (res, stat, body) => {
    return res.status(stat).json({...body});
};

const listRestaurant = async (req, res) => {
    var userCredential;
    if (req.user) {
        userCredential = req.user;
    };
    try {
        var doc = await restaurantModel.listRestaurant();
        if (userCredential) {
            doc = await restaurantModel.listRestaurant(userCredential.uid);
        };
        return handleReturns(res, 200, {doc});
    } catch (error) {
        return handleReturns(res, 500, {msg:error.message});
    };
};

const createRestaurant = async (req, res) => {
    const userCredential = req.user;

    const {
        img,
        name,
        location,
        portions,
        timeCreated,
        timeLeft,
        tags
    } = req.body;

    if (!img || !name || !location || !portions || !timeCreated || !timeLeft || !tags) {
        return handleReturns(res, 400, {msg: "Invalid params"});
    };

    const params = {
        img,
        name,
        location,
        portions,
        timeCreated,
        timeLeft,
        tags,
        userId: userCredential.uid,
    };

    try {
        const doc = await restaurantModel.createRestaurant(params);
        return handleReturns(res, 200, {resId: doc.id});
    } catch (error) {
        return handleReturns(res, 500, {msg: error.message})
    };
};

const uploadFile = async (req, res) => {
    if (!req.file) {
        return handleReturns(res, 400, {msg:"Invalid file"});
    };

    const fileUrl = `http://localhost:4444/uploads/${req.file.filename}`;
    return handleReturns(res, 200, {fileUrl});
};

export default {
    listRestaurant,
    createRestaurant,
    uploadFile
}