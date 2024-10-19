"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Authentication Tutorial
------------------------------------------------------- */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './src/db/connect.js';
import cookieParser from 'cookie-parser';
import fs from "node:fs";

const app = express();

/* ------------------------------------------------------- */
// Required Modules:

dotenv.config();

const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Middlewares:

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

// Accept JSON:
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/* ------------------------------------------------------- */
// Routes:

const routeFiles = fs.readdirSync("./src/routes")

routeFiles.forEach((file) => {
    // use dynamic import to import the route
    import(`./src/routes/${file}`).then((route) => {
        app.use("/api/v1", route.default)
    }).catch((err) => {
        console.log("Failed to load route file", err)
    });
});

const server = async () => {
    try {
        await connect()

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Failed to start server...", error.message)
        process.exit(1)
    }
};

server();