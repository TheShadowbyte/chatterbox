const User = require('../models/User');

// Retrieve a user by their ID
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error('Unable to find the user');
    }
};

// Retrieve a user by a one-time token
// This is a placeholder function; your actual implementation may differ
const getUserByToken = async (oneTimeToken) => {
    try {
        // You'd have some logic to match the one-time token to a user.
        // This might involve a database lookup, for example:
        const user = await User.findOne({ 'tokens.token': oneTimeToken });
        return user;
    } catch (error) {
        throw new Error('Unable to find the user with the given token');
    }
};

// Other user-related helper functions can be added here...

module.exports = {
    getUserById,
    getUserByToken,
};
