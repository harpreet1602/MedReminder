let sendSMS = (userNum) => {
    let { AUTH_SID, AUTH_TOKEN, PHONE } = require('../config');

    let client = require("twilio")(AUTH_SID, AUTH_TOKEN);

    client.messages.create({
        to: userNum,
        from: PHONE,
        body: "testing"
    }).then((message) => {

        console.log(message.accountSid);
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = sendSMS;