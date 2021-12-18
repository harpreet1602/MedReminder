require('dotenv').config();

const express = require('express');
const app = express();
let PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_LINK).then(() => {
    console.log("connected")
}).catch((err) => {
    console.log("err " + err)
})

app.use(express.json());

app.use('/api/medicine', require('./Routes/medicineRouter'));
app.use('/api/user', require('./Routes/userRouter'));

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})

// const alarmModel = require('./Models/alarmModel')
// async function create() {
//     for (let i = 0; i <= 23; i++) {
//         await alarmModel.create({
//             time: Number(i)
//         })
//     }
// }

// create();

