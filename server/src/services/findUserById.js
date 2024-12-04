const createError = require('http-errors');
const user = require("../Model/model");
const mongoose = require('mongoose');

const findUserById = async(id) => {

    try {
        // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, 'Invalid User ID format'));
    }

    // Fetch the user
    const options = { password: 0 }; // Exclude password from response
    const fetchedUser = await user.findById(id, options);

        // Handle user not found
        if (!fetchedUser) {
            throw createError(404, 'User does not exist with this ID');
        }
        return fetchedUser;
    } catch (error) {
        console.error('Error in getUser:', error); // Log error for debugging

        if (error.name === 'CastError' || error instanceof mongoose.Error) {
            throw (createError(400, 'Invalid User ID'));
        } 
        throw error;
    }

}

module.exports = findUserById;