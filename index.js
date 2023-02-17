const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('184.147.19.52', (error, coordinates) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:', coordinates);
// });

// coordinates = { latitude: 43.5890452, longitude: -79.6441198 };
// fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:', passTimes);
// });


// //--------------from LHL
// // iss.js

// const request = require('request');

// /**
//  * Makes a single API request to retrieve the user's IP address.
//  * Input:
//  *   - A callback (to pass back an error or the IP string)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The IP address as a string (null if error). Example: "162.245.144.188"
//  */
// const fetchMyIP = function(callback) {
//   request('https://api.ipify.org?format=json', (error, response, body) => {
//     if (error) return callback(error, null);

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
//       return;
//     }

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

// /**
//  * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
//  * Input:
//  *   - The ip (ipv4) address (string)
//  *   - A callback (to pass back an error or the lat/lng object)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The lat and lng as an object (null if error). Example:
//  *     { latitude: '49.27670', longitude: '-123.13000' }
//  */
// const fetchCoordsByIP = function(ip, callback) {
//   request(`http://ipwho.is/${ip}`, (error, response, body) => {

//     if (error) {
//       callback(error, null);
//       return;
//     }

//     const parsedBody = JSON.parse(body);

//     if (!parsedBody.success) {
//       const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
//       callback(Error(message), null);
//       return;
//     }

//     const { latitude, longitude } = parsedBody;

//     callback(null, {latitude, longitude});
//   });
// };

// /**
//  * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
//  * Input:
//  *   - An object with keys `latitude` and `longitude`
//  *   - A callback (to pass back an error or the array of resulting data)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The fly over times as an array of objects (null if error). Example:
//  *     [ { risetime: 134564234, duration: 600 }, ... ]
//  */
// const fetchISSFlyOverTimes = function(coords, callback) {
//   const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

//   request(url, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
//       return;
//     }

//     const passes = JSON.parse(body).response;
//     callback(null, passes);
//   });
// };