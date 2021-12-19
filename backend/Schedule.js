let scheduling = () => {
    const alarmModel = require("./Models/alarmModel")
    const medicineModel = require("./Models/medicineModel")
    const userModel = require("./Models/userModel")
    const sendSMS = require('./Services/MAKE_CALL');
    let i = 0;

    var CronJob = require('cron').CronJob;
    var alertJob = new CronJob('0 * * * *', function () {
        remind();
        console.log("HELLO")
    }, null, true, 'Asia/Kolkata')

    alertJob.start();

    let remind = async () => {
        const d = new Date();
        let hour = d.getHours();
        let allAlarms = await alarmModel.find({ time: Number(hour) });
        let { allMedicines } = allAlarms
        for (let i = 0; i < allMedicines.length; i++) {
            let medicine = await medicineModel.findById(allMedicines[i]);
            let user = await medicineModel.findById(medicine.userId);
            let { phoneNum } = user
            sendSMS(phoneNum);
            console.log("message sent");
        }
    }

    var expiryJob = new CronJob('0 8 * * *', function () {
        expiryCheck();
    }, null, true, 'Asia/Kolkata')

    expiryJob.start();

    let expiryCheck = async () => {
        let allBuckets = await alarmModel.find();
        for (let i = 0; i < allBuckets.length; i++) {
            let { allMedicines } = allBuckets[i];
            for (let j = 0; j < allMedicines.length; j++) {
                let medicine = await medicineModel.findById(allMedicines[j]);
                let user = await medicineModel.findById(medicine.userId);
                let { phoneNum } = user
                const d = new Date();
                let d2 = new Date(medicine.expiry);
                if (d2 > d) {
                    sendSMS(phoneNum);
                }
            }
        }
    }
}

module.exports = scheduling