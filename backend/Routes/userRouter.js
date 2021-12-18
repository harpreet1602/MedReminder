const express = require("express");
let userRouter = express.Router();
const userModel = require('../Models/userModel');
const medicineModel = require('../Models/medicineModel');

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

let getUserMedicines = async (req, res) => {
    try {
        let user = await userModel.findById(req.params.userId).populate({
            path: 'medicines'
        });
        res.status(200).json({
            user
        })
    }
    catch (err) {
        res.status(500).json({
            message: "err " + err
        });
    }
}

userRouter.route('/')
    .post(createUser);

userRouter.route('/:userId')
    .get(getUserMedicines)

module.exports = userRouter