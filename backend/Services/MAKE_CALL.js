let makeCall = (userNum) => {

  let { AUTH_SID, AUTH_TOKEN, PHONE } = require("../config");

  let client = require("twilio")(AUTH_SID, AUTH_TOKEN);

  client.calls
    .create({
      url: "http://127.0.0.1:3000/",
      to: userNum,
      from: PHONE,
    })
    .then((call) => console.log(call.sid))
    .catch((err) => {
      console.log(err);
    });

}

module.exports = makeCall