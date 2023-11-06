// authHelpers.js
const jwt = require('jsonwebtoken');

// Assuming you have a function to retrieve the user based on the one-time token
const { getUserByToken } = require('./userHelpers');

const generateOneTimeToken = (userId) => {
    // The payload could include any data you want to encode in the token, like the user's ID
    const payload = { id: userId };
    // The secret should be an environment variable for security reasons
    const secret = process.env.JWT_SECRET;
    // The options object can include things like the token's expiration time
    const options = { expiresIn: '5m' }; // expires in 5 minutes

    return jwt.sign(payload, secret, options);
}

const validateOneTimeToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject('Token is required');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Retrieve user using the token's decoded information (e.g., user ID)
            getUserByToken(decoded.id)
                .then(user => {
                    if (!user) {
                        reject('User not found');
                    }
                    resolve(user);
                })
                .catch(err => reject(err));
        } catch (error) {
            reject('Token is not valid');
        }
    });
};

module.exports = {
    generateOneTimeToken,
    validateOneTimeToken,
};
