require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 3004;

const mongodbURL = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017/ecommerceMernDB';

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 
'public/image/users/default.png';

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'sdffdgere3547yrbfg';


module.exports = { serverPort, mongodbURL, defaultImagePath, jwtActivationKey };


