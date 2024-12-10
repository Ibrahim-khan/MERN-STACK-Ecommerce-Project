const {body} = require('express-validator');
// registration validation
const validateUserRegistration = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({min: 3, max: 31})
        .withMessage('Name shuld be at least 3-31 characters long'),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage('Invalid Email address'),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 6})
        .withMessage('Password shuld be at least 6 characters long'),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")
        .isLength({min: 3})
        .withMessage('Address should be at least 3 characters long'),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone is required")
        .isNumeric()
        .withMessage("Phone number must contain only numbers"),
        

    body("image")
        .optional()
        .isString()
];
// sign in validation


module.exports = {validateUserRegistration}
