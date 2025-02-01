"use strict";

/* Importing of modules */
import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

/* Importing routes */
import FoodRoute from './routes/food.js';
import RestaurantRoute from './routes/restaurant.js';

/* Initialization of app */
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

const acceptedOrigin = ["http://localhost:3000"]

app.use(cors({
    origin: (origin, callback) => {
        if (acceptedOrigin.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        };
    },
    credentials: true
}));

app.get('/health', (_, res) => {
    res.status(200).json({
        status: 'Everything is up and running',
        timestamp: new Date().toUTCString(),
    });
});

app.use(express.static("public"));
app.use("/food", FoodRoute);
app.use("/restaurant", RestaurantRoute);

app.listen(config.port, () => {
    console.log(`Backend server started on http://${config.host}:${config.port}`)
});