const route = require('express').Router();

// import controllers
const { RegisterUser } = require('../controllers/users-controller')




// define routes
route.get('/register', RegisterUser);


module.exports = route;