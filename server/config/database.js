const mongoose = require('mongoose');

// Connection URI
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatApp';

// Options to pass to the mongoose.connect method
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, options);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
