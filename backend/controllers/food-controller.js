import foodModel from '../models/food-model.js';
import authModel from '../models/auth-model.js';

const handleReturns = async (res, stat, body) => {
    return res.status(stat).json({...body});
};

const listFoods = async (req, res) => {
    const resId = req.params.id
    
    try {
        let doc = await foodModel.listFoods();
        if (resId) {
            doc = await foodModel.listFoods(resId)
        };
        return handleReturns(res, 200, {doc});
    } catch (error) {
        return handleReturns(res, 500, {msg: error.message});
    };
};  

const createFood = async (req, res) => {
    const {
        resId,
        quantity,
        discount,
        discountVal,
        timeLimit,
    } = req.body;

    if (!resId, !quantity) {
        return handleReturns(res, 400, {msg: "Invalid Parameters."})
    };

    if (discount && ! discountVal) {
        return handleReturns(res, 400, {msg: "Invalid Parameters."})
    };

    try {
        const doc = await foodModel.createFood({
            resId, quantity, discount, discountVal, timeLimit,
            timestamp: Date.now(),
        });
        return handleReturns(res, 200, {foodId: doc.id});
    } catch (error) {
        return handleReturns(res, 500, {msg: error.message});
    };
};

const updateQuantity = async (req,res) => {
    const foodId = req.params.id;
    const dir = req.query.dir;

    if (!foodId || !dir){
        return handleReturns(res, 400, {msg: "Invalid Parameters."})
    }

    try {
        const doc = await foodModel.updateQuantity(foodId, dir);
        return handleReturns(res, 200, null);
    } catch (error) {
        return handleReturns(res, 500, {msg: error.message});
    }
};

export default {
    listFoods,
    createFood,
    updateQuantity
}