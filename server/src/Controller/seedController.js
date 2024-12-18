const data = require('../data');
const User = require('../Model/model');


const seedUser = async(req, res, next) => {
    try {
        // deleting all existing users
        await User.deleteMany({});

        // inserting new user
        const users = await User.insertMany(data.users)

        //successfull response
        return res.status(201).json(users);
    } catch (error) {
        next(error);
    }
}

module.exports = {seedUser};