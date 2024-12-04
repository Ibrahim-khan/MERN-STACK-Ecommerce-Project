const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const userRouter = require('./Router/router');
const { seedUser } = require('./Controller/seedController');
const seedRouter = require('./Router/seedRouter');
const app = express();
const {errorResponse} = require('./Controller/responseController');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);


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
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message
  });
});


module.exports = app;