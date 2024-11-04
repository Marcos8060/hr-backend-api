const route = require('express').Router();
const ProtectedRoute = require('../protect-route.js/index')

// import controllers
const { getProfileDetails,createProfile,updateProfile } = require('../controllers/profile-controller')




// define routes
route.get('/get-profile', ProtectedRoute, getProfileDetails);
route.post('/create-profile', ProtectedRoute, createProfile);
route.put('/update-profile', ProtectedRoute, updateProfile);


module.exports = route;