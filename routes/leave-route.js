const route = require('express').Router();
const ProtectedRoute = require('../middleware/protected-routes')
const authorizeRole = require('../middleware/role-based-access')

// import controllers
const { getLeaveDetails,updateLeave,createLeave,deleteLeave, fetchAllLeaves } = require('../controllers/leave-controller')




// define routes
route.get('/get-leave', ProtectedRoute, getLeaveDetails);
route.get('/fetch-all-leaves', ProtectedRoute, fetchAllLeaves);
route.post('/create-leave', ProtectedRoute, createLeave);
route.put('/approve-leave/:id', ProtectedRoute,authorizeRole('Admin'), updateLeave);
route.put('/update-leave/:id', ProtectedRoute, updateLeave);
route.delete('/delete-leave/:id', ProtectedRoute, deleteLeave);


module.exports = route;