import admin from '../config/firebase.js';
import restaurantModel from './restaurant-model.js';

const db = admin.firestore();
const foodRef = db.collection("food");

const listFoods = async (resId) => {
    try {
        let query = await foodRef.get();;
        if (resId) {
            query = await foodRef.where("resId", "==", resId).get()
        };

        const doc = query.docs.map((doc) => ({
            data: {
                id: doc.id,
                resId: doc.data()["resId"],
                quantity: doc.data()["quantity"],
                discount: doc.data()["discount"],
                discountVal: doc.data()["discountVal"],
                timeLimit: doc.data()["timeLimit"],
            },
        }));
        return doc;
    } catch (error) {
        throw new Error ("Collection doesn't exist.")
    };
};

const createFood = async (params) => {
    try {
        const doc = await foodRef.add({...params});
        return doc;
    } catch (error) {
        throw new Error("Invalid inputs");
    };
};

const updateQuantity = async (foodId, dir) => {
    try {
        const doc = await foodRef.doc(foodId).get();
        
        if (!doc.exists) {
            throw new Error("Food item not found");
        };

        var currentQuantity = doc.data()["quantity"];

        if (typeof currentQuantity !== 'number' || currentQuantity <= 0) {
            throw new Error("Invalid or insufficient quantity");
        }

        if (dir == "up") {
            currentQuantity++;
        } else {
            currentQuantity--;
        };

        const upDoc = await foodRef.doc(foodId).update({quantity: currentQuantity})
        return upDoc;
    } catch (error) {
        throw new Error("Invalid food id");
    };
};

export default {
    listFoods,
    createFood,
    updateQuantity
};