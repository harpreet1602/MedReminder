const http = require('http');
const twiml = require('twilio').twiml;

http
  .createServer((req, res) => {
    // Create TwiML response
      const voiceResponse= new twiml.VoiceResponse()
        
      voiceResponse.say('Hello from your pals at Twilio! Have fun.');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(voiceResponse.toString());
  })
  .listen(1337, '127.0.0.1');

console.log('TwiML server running at http://127.0.0.1:1337/');
