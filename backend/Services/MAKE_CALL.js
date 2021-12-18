let { AUTH_SID, AUTH_TOKEN, PHONE } = require("../config");

let client = require("twilio")(AUTH_SID, AUTH_TOKEN);

client.calls
  .create({
    url: "http://127.0.0.1:1337/",
    to: "+918295475934",
    from: PHONE,
  })
  .then((call) => console.log(call.sid))
  .catch((err) => {
    console.log(err);
  });
