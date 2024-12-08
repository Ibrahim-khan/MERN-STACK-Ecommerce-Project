const jwt = require('jsonwebtoken');


const createJsonWebToken = (payload, secretKey ,expiresIn) => {
    
    if (typeof payload !== 'object' || !payload) {
        throw new Error('Payload must be a non-empty object');
    }
    if (typeof secretKey !== 'string' || secretKey === ''){
        throw new Error ('Secrete key must bea not-empty string');
    }
    try {
        const token = jwt.sign(payload, secretKey, {
            expiresIn
        });
        return token;
    } catch (error) {
        console.error('Failed to sign the JWT:', err);
        throw error;
    }
};
module.exports = {createJsonWebToken};