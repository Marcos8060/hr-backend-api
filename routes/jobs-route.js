const route = require("express").Router();
const { createJob, fetchJobs } = require('../controllers/jobs-controller')
const ProtectedRoute = require('../middleware/protected-routes')


route.post('/post-job', ProtectedRoute,createJob)
route.get('/get-jobs', fetchJobs)


module.exports = route;
