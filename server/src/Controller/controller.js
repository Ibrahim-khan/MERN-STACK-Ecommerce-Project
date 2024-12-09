const fs = require('fs').promises; // Use promises for cleaner handling
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const user = require('../Model/model'); 
const { successResponse } = require('./responseController');
const findWithId = require('../services/findItem');
const { createJsonWebToken } = require('../../helper/jwonwebtoken');
const { jwtActivationKey, clientURL } = require('../secret');
const emailWithNodeMailer = require('../../helper/email');

// Reusable user query options
const USER_EXCLUDE_OPTIONS = { password: 0 };

const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp(`.*${search}.*`, 'i');
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ],
        };

        const users = await user
            .find(filter, USER_EXCLUDE_OPTIONS)
            .limit(limit)
            .skip((page - 1) * limit);

        const count = await user.countDocuments(filter);

        if (!users.length) throw createError(404, 'No users found');

        return successResponse(res, {
            statusCode: 200,
            message: 'Users were returned successfully',
            payload: {
                users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page > 1 ? page - 1 : null,
                    nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const getUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fetchedUser = await findWithId(user, id, USER_EXCLUDE_OPTIONS);

        return successResponse(res, {
            statusCode: 200,
            message: 'User was returned successfully',
            payload: { user: fetchedUser },
        });
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fetchedUser = await findWithId(user, id, USER_EXCLUDE_OPTIONS);

        const userImagePath = fetchedUser.image;
        try {
            await fs.unlink(userImagePath);
            console.log('User image was deleted');
        } catch (err) {
            console.error('Error deleting user image:', err.message);
        }

        await user.findByIdAndDelete({ _id: id, isAdmin: false });

        return successResponse(res, {
            statusCode: 200,
            message: 'User was deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

const processRegister = async (req, res, next) => {
    try {
       
        const {name, email, password, phone, address} = req.body;

        const userExists = await user.exists({email: email});
        if (userExists) {
            throw createError(409, 'User with this email already exits. please sign in');
        }

        // create jwt
        const token = createJsonWebToken(
            {name, email, password, phone, address}, 
            jwtActivationKey, 
            '10m'
        );

        // prepare email
         const emailData = {
            email,
            subject: 'Account Activation Email',
            html: `
                <h2>Hello ${name} !</h2>
                <p>Please click here to <a href ="${clientURL}/
                api/users/activate/${token}" target="_blank"> activate
                your account</a> </p>
            `
         }


        // send email with nodemailer
        try {
            await emailWithNodeMailer(emailData)
        } catch (emailError) {
            next(createError(500, 'Failed to send verification email'));
            return ;
        }


        console.log(token)

        return successResponse(res, {
            statusCode: 200,
            message: `Please go to your ${email} for completing your registration process`,
            payload: {token}
        });
    } catch (error) {
        next(error);
    }
};

const activateUserAccount = async (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) {
            throw createError(404, 'Token not found');
        }

        const decoded = jwt.verify(token, jwtActivationKey);
        if (!decoded) {
            throw createError(401, 'User was not able to be verified');
        }

        const userExists = await user.exists({email: decoded.email});
        if (userExists) {
            throw createError(409, 'User with this email already exits. please sign in');
        }


        await user.create(decoded);

        return successResponse(res, {
            statusCode: 201,
            message: "User was registered successfully",
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            next(createError(401, 'Token has expired'));
        } else if (error.name === 'JsonWebTokenError') {
            next(createError(401, 'Invalid Token'));
        } else {
            next(error);
        }
    }
};



module.exports = { getUsers, getUserByID, deleteUserById, processRegister, activateUserAccount };