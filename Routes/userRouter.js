const express = require("express");
let userRouter = express.Router();
const userModel = require('../Models/userModel');


let createUser = async (req, res) => {
    try {
        let user = await userModel.create(req.body);
        res.status(200).json({
            message: "created",
            user
        })
    } catch (err) {
        res.status(500).json({
            message: "err " + err
        });
    }
}

userRouter.route('/')
    .post(createUser);



module.exports = userRouter