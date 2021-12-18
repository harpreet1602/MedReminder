const mongoose = require('mongoose');

let alarmSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true
    },
    allMedicines: {
        type: [mongoose.Schema.ObjectId],
        ref: 'medicineModel'
    }
});

let alarmModel = mongoose.model("alarmModel", alarmSchema);

module.exports = alarmModel;