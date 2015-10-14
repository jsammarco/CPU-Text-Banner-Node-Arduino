/*jslint node:true*/
'use strict';

var cpu = require('cpu-load');
var pid = 1;//process.pid;
var SerialPort = require("serialport").SerialPort;
// var serialport = new SerialPort("/dev/tty.usbmodemfa131");
var serialport = new SerialPort("/dev/tty.usbserial-AL00WQED", {
        baudrate: 9600
    }, false),
    str,
    val;

serialport.open(function (error) {
    if (error) {
        console.log('failed to open: ' + error);
    } else {
        console.log('open');
        serialport.on('data', function (data) {
            console.log('data received: ' + data);
        });
        setInterval(function () {
            cpu(1000, function (load) {
                load = (load * 100).toFixed(0);
                serialport.write(load + "% CPU\r\n", function (err, res) {
                    if (err) { return console.log(err); }
                    console.log("Load:" + load, res);
                });
            });
        }, 1000);
    }
});

