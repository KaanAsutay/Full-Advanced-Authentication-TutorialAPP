"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Authentication Tutorial
------------------------------------------------------- */
import asyncHandler from "express-async-handler"

export const deleteUser = asyncHandler(async (req, res) => {
    req.status(200).json({ message: "User deleted" })
});