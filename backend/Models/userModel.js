const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    medicines: {
        type: [mongoose.Schema.ObjectId],
        ref: "medicineModel"
    },
    phoneNum: {
        type: String,
        required: true
    }
});

let userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;