const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');


const userRouter = require('./Router/router');
const {seedUser} = require('./Controller/seedController');
const seedRouter = require('./Router/seedRouter');
const {errorResponse} = require('./Controller/responseController');
const authRouter = require('./Router/authRouter');

const dotenv = require('dotenv');
const app = express();

dotenv.config();

const rateLimiter = rateLimit({
  windows: 1 * 60 * 1000, // 1 minute,
  max: 5,
  message: 'Too many request from this IP. Please try again later',
});

// Middleware
app.use(cookieParser());
app.use(rateLimiter);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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