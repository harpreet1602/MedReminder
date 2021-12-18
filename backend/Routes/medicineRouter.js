const medicineModel = require('../Models/medicineModel');
const userModel = require('../Models/userModel');
const alarmModel = require('../Models/alarmModel');
const express = require("express");
let medicineRouter = express.Router();


let addMedicine = async (req, res) => {
    try {
        if (!req.body.name || !req.body.expiry || !req.body.userId) {
            res.status(400).json({
                message: "Please enter name and expiry"
            })
        }
        let user = await userModel.findOne({ '_id': req.body.userId })
        if (user) {
            if (!req.body.alarmTime) {
                let medicine = await medicineModel.create(req.body);
                user.medicines.push(medicine['_id'])
                let newUser = await user.save();
                res.status(200).json({
                    message: "created",
                    medicine,
                    newUser
                })
            }
            else {
                let medicine = await medicineModel.create(req.body);
                user.medicines.push(medicine['_id'])
                let newUser = await user.save();
                let alarmBucket = await alarmModel.findOne({ time: req.body.alarmTime })
                alarmBucket.allMedicines.push(medicine['_id']);
                let newAlarmBucket = await alarmBucket.save();
                res.status(200).json({
                    message: "created",
                    newUser,
                    newAlarmBucket,
                    medicine
                })
            }
        }
        else {
            res.status(400).json({
                message: "userId does not exist"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "err " + err
        });
    }
}

medicineRouter.route('/')
    .post(addMedicine);

module.exports = medicineRouter