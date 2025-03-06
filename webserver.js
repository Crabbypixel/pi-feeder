// CAMERA
const livestream = require('rpi_camera_livestream');
livestream.setVerboseMode(true);
livestream.setPort(3333);
livestream.setPathname('/webcam');
livestream.start().then(url => console.log(`Livestream started on ${url}`));


// OTHERS

var Gpio = require('onoff').Gpio; //require onoff to control GPIO
var LEDPin = new Gpio(4, 'out'); //declare GPIO4 an output
var fs = require('fs'); //require filesystem to read html files
var http = require('http').createServer(function handler(req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function (err, data) { //read html file
    if (err) {
      res.writeHead(500);
      return res.end('Error loading socket.io.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});

const io = require("socket.io")({ allowEIO3: true}).listen(http);

http.listen(8080); //listen to port 8080

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var buttonState = 0; //variable to store button state

  socket.on('state', function (data) { //get button state from client
    buttonState = data;
    //if (buttonState != LEDPin.readSync()) { //Change LED state if button state is changed
    //  LEDPin.writeSync(buttonState); //turn LED on or off
    //}
    
    if(data == 0) {
      console.log("off");
      LEDPin.writeSync(0);
    }
    
    else if(data == 1) {
      console.log("on");
      LEDPin.writeSync(1);
    }
    
    else if(data == 3) {
      console.log("servo 1 on");
      var exec = require('child_process').exec;
      exec('python servo1.py', function(err, stdout, stderr){});
    }

    else if(data == 5) {
      console.log("servo 2 on");
      var exec = require('child_process').exec;
      exec('python servo2.py', function(err, stdout, stderr){});
    }
    
    else if(data == 2) {
      console.log("play sound");
      var exec = require('child_process').exec;
      exec('aplay music.wav', function(err, stdout, stderr){});
    }
  });
});

