const http = require('http');
const twiml = require('twilio').twiml;

let getResponce=(req,res)=>{
  const voiceResponse= new twiml.VoiceResponse()
        
      voiceResponse.say('Hello from your pals at Twilio! Have fun.');

    res.set('Content-Type', 'text/xml' );
    res.send(voiceResponse.toString());
}

module.exports=getResponce;