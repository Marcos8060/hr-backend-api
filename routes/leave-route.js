const route = require('express').Router();
const ProtectedRoute = require('../middleware/protected-routes')

// import controllers
const { getLeaveDetails,updateLeave,createLeave,deleteLeave } = require('../controllers/leave-controller')




// define routes
route.get('/get-leave', ProtectedRoute, getLeaveDetails);
route.post('/create-leave', ProtectedRoute, createLeave);
route.put('/update-leave/:id', ProtectedRoute, updateLeave);
route.delete('/delete-leave/:id', ProtectedRoute, deleteLeave);


module.exports = route;