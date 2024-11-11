const route = require('express').Router();
const ProtectedRoute = require('../middleware/protected-routes')
const upload = require('../middleware/image-upload')

// import controllers
const { getProfileDetails,createProfile,updateProfile } = require('../controllers/profile-controller')




// define routes
route.get('/get-profile', ProtectedRoute, getProfileDetails);
route.post('/create-profile', ProtectedRoute,upload.single("image"), createProfile);
route.put('/update-profile', ProtectedRoute,upload.single("image"), updateProfile);


module.exports = route;