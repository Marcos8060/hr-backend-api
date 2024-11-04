const express = require('express');


const app = express();

app.listen(3000)


// import routes
const RegisterRoute = require('./routes/users-routes')


app.use('/api', RegisterRoute);