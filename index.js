const express = require('express');
const dotenv = require("dotenv");
const { Client } = require("pg");
const cors = require('cors');

dotenv.config();


const app = express();


// configure postgresql connection
const client = new Client({
    user: process.env.DB_USER,
    host: "localhost", // Your database host
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
  });
  
  // Connect to the PostgreSQL database
  client
    .connect()
    .then(() => {
      console.log("Connected to the PostgreSQL database");
      // Start the Express server after successful database connection
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((err) => {
      console.error("Connection Failed", err);
    });



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const corsOptions = {
  origin: 'http://localhost:3001/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Configure CORS middleware
app.use(cors(corsOptions));


// import routes
const RegisterRoute = require('./routes/users-routes')
const ProfileRoute = require('./routes/profile-route')
const ProductRoute = require('./routes/product-route')
const LeaveRoute = require('./routes/leave-route')


app.use('/api', RegisterRoute);
app.use('/api', ProfileRoute);
app.use('/api', ProductRoute);
app.use('/api', LeaveRoute);