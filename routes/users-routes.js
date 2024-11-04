const route = require('express').Router();

// import controllers
const { RegisterUser, LoginUser } = require('../controllers/users-controller')




// define routes
route.post('/register', RegisterUser);
route.post('/login', LoginUser);


module.exports = route;