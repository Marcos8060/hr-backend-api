const route = require('express').Router();

// import controllers
const { RegisterUser, LoginUser,updateRole,fetchAllUsers,deleteUser,editUser } = require('../controllers/users-controller')
const protectedRoute = require('../middleware/protected-routes')
const authorizeRole = require('../middleware/role-based-access')



// define routes
route.post('/register',protectedRoute,authorizeRole('Admin'), RegisterUser);
route.post('/login', LoginUser);
route.get('/users', protectedRoute, fetchAllUsers);
route.put('/users/update-role', protectedRoute, authorizeRole('Admin'), updateRole);
route.delete('/delete-user/:id', protectedRoute, authorizeRole('Admin'), deleteUser);
route.put('/edit-user/:id', protectedRoute, authorizeRole('Admin'), editUser);


module.exports = route;