'use strict';

var request = require('request');
var config = require('./config');
var device = require(`./lib/${config.deviceType}`);
var POST_API = `http://${config.server}:${config.port}/sensors/` +
               `${config.sensorKey}/data?apiKey=${config.apiKey}`;

device.on('data', function(data) {
  request.post(POST_API, {
    form: { pm25Index: data.pm25 }
  }, function(err, response, body) {
    !err ? console.log(body) : console.error(err);
  });
  console.log(`PM1.0: ${data.pm10}\nPM2.5: ${data.pm25}\nPM10: ${data.pm100}`);
});
