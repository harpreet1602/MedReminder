const mongoose = require('mongoose');

let medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expiry: {
        type: String
    },
    alarmTime: {
        type: String
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userModel"
    },
    startDate: {
        type: String
    },
    illnessName: {
        type: String,
    }
});

let medicineModel = mongoose.model("medicineModel", medicineSchema);

module.exports = medicineModel;