const createError = require('http-errors');
const mongoose = require('mongoose');

const findWithId = async (Model, id, options = {}) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createError(400, 'Invalid User ID format');
        }

        const fetchedUser = await Model.findById(id, options);

        if (!fetchedUser) {
            throw createError(404, `${Model.modelName} does not exist with this ID`);
        }

        return fetchedUser;
    } catch (error) {
        console.error('Error in findWithId:', error);
        throw createError(500, 'Something went wrong');
    }
};

module.exports = findWithId;
