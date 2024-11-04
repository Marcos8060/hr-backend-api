const route = require('express').Router();
const ProtectRoute = require('../protect-route.js/index')

// import controllers
const { getProfileDetails,createProfile } = require('../controllers/profile-controller')




// define routes
route.get('/get-profile', ProtectRoute, getProfileDetails);
route.post('/create-profile', ProtectRoute, createProfile);
// route.post('/update-profile', updateProfile);


module.exports = route;