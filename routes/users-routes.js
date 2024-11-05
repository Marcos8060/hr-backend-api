const route = require('express').Router();

// import controllers
const { RegisterUser, LoginUser,updateRole,fetchAllUsers } = require('../controllers/users-controller')
const protectedRoute = require('../middleware/protected-routes')
const authorizeRole = require('../middleware/role-based-access')



// define routes
route.post('/register', RegisterUser);
route.post('/login', LoginUser);
route.get('/users', protectedRoute, authorizeRole('user'), fetchAllUsers);
route.put('/users/update-role', protectedRoute, authorizeRole('user'), updateRole);


module.exports = route;