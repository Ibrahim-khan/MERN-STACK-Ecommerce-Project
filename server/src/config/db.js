const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDatabase = async(options ={}) => {
    try {
        await mongoose.connect(mongodbURL, options);
        console.log('Connection to DB is successfully established');

        mongoose.connection.on('error', (error) => {
            console.error('DB conneciton error: ', error)
        });
    } catch (error) {
        console.log('Could not connect to DB: ', error.toString());
    }
}

module.exports = connectDatabase;