"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Autentication Tutorial
------------------------------------------------------- */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './src/db/connect.js';

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