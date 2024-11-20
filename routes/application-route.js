const route = require("express").Router();
const uploadResume = require('../middleware/upload-resume')
const { applyJob } = require('../controllers/application-controller')


route.post('/send-application',uploadResume, applyJob)


module.exports = route;
