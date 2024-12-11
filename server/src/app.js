const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const dotenv = require('dotenv');
const userRouter = require('./Router/router');
const seedRouter = require('./Router/seedRouter');
const app = express();
const {errorResponse} = require('./Controller/responseController');
const authRouter = require('./Router/authRouter');

dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);
app.use("/api/auth", authRouter);

// Test endpoint
app.get("/test", (req,res) => {
    res.status(200).send({
        message: "api is testing working fine",
    });
});


// client error handling
app.use((req, res, next) => {
  next(createError(404, 'route not found'));
});

// server error handling -> all the errors
app.use((err,req, res, next) => {
  console.error(`Error: ${err.message}`); 
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});


module.exports = app;