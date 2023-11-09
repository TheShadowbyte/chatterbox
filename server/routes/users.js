const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Get user by id
router.get('/:id', async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        // Create a response that includes the id, username and createdAt properties
        const response = {
            id: user._id,
            username: user.username,
            createdAt: user.createdAt
        };

        res.json(response);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get usernames from a list of user ids
router.post('/usernames', async (req, res) => {
    try {

        const usernames = await User.find({ _id: { $in: req.body.userIds } }).select('username');

        res.json(usernames);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            username: req.body.username,
            password: req.body.password
        });

        await user.save();

        // Create and return the JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // Token expiration
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Authenticate user and get token (Login)
router.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body;

        // Check for user
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid Credentials'
            });
        }

        // Create and return the JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
