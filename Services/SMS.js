let {AUTH_SID,AUTH_TOKEN,PHONE}=require('./config');

let client=require("twilio")(AUTH_SID,AUTH_TOKEN);

client.messages.create({
    to:"+918295475934",
    from:PHONE,
    body:"testing"
}).then((message)=>{

    console.log(message.accountSid);
})
.catch(err=>{
    console.log(err);
});