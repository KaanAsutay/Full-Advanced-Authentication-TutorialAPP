"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Authentication Tutorial
------------------------------------------------------- */
import asyncHandler from "express-async-handler"
import User from "../../models/auth/UserModel.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
        // 400 Bad Request
        res.status(400).json({ message: "All field are required" })
    }

    // check password length
    if (password.lenght < 6) {
        return res
            .status(400)
            .json({ message: 'Password must be at least 6 characters' })
    }

    // check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        // bad request
        return res.status(400).json({ message: 'User already exists' })
    }

    // create new user
    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
       const { _id, name, email, role, photo, bio, isVerified } = user;

       // 201 Created
       res.status(201).json({
        _id,
        name,
        email,
        role,
        photo,
        bio,
        isVerified
       })
    } else {
        res.status(400).json({ message: "Invalid user data"})
    }
})