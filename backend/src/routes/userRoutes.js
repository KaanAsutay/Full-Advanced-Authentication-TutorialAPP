"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Authentication Tutorial
------------------------------------------------------- */
import express from 'express'
import { registerUser } from '../controllers/auth/userController.js';

const router = express.Router()

router.post('/register', registerUser)

export default router;