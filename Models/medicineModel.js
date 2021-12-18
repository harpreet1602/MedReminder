const mongoose = require('mongoose');

let medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    alarmTime: {
        type: String
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userModel"
    },
    startDate: {
        type: String,
        required: true
    },
    illnessName: {
        type: String,
    }
});

let medicineModel = mongoose.model("medicineModel", medicineSchema);

module.exports = medicineModel;