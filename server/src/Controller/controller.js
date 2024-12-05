const fs = require('fs').promises; // Use promises for cleaner handling
const createError = require('http-errors');
const user = require('../Model/model'); 
const { successResponse } = require('./responseController');
const findWithId = require('../services/findItem');

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
        const fetchedUser = await findWithId(id, USER_EXCLUDE_OPTIONS);

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

module.exports = { getUsers, getUserByID, deleteUserById };