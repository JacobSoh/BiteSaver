import admin from '../config/firebase.js';

const db = admin.firestore();
const restaurantRef = db.collection("restaurant");

const listRestaurant = async (userId) => {
    try {
        var query = await restaurantRef.get();
        if (userId) {
            query = await restaurantRef.where("userId", "==", userId).get();
        };

        const doc = query.docs.map((doc) => (
            {
                id: doc.id,
                img: doc.data()["img"],
                name: doc.data()["name"],
                location: doc.data()["location"],
                portions: doc.data()["portions"], // add
                timeCreated: doc.data()["timeCreated"], //add,
                timeLeft: doc.data()["timeLeft"],
                tags: doc.data()["tags"],
                userId: userId?doc.data()["userId"]:null,
            }
        ));
        return doc;
    } catch (error) {
        throw new Error ("Collection doesn't exist.")
    };
};

const createRestaurant = async (params) => {
    try {
        const doc = await restaurantRef.add({...params});
        return doc;
    } catch (error) {
        throw new Error("Invalid inputs");
    };
};

export default {
    listRestaurant,
    createRestaurant
};