let { DB_LINK } = require("./config.js");


const express = require('express');
const app = express();
let PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const path = require('path');
mongoose.connect(DB_LINK).then(() => {
    console.log("connected")
}).catch((err) => {
    console.log("err " + err)
})


app.use('/', express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

app.use('/api/medicine', require('./Routes/medicineRouter'));
app.use('/api/user', require('./Routes/userRouter'));

app.get('/voice',require('./Services/voice'));

const makeCall=require('./Services/MAKE_CALL');

makeCall();

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

