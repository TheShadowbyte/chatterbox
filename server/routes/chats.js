const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {Chat} = require("../models/Chat");
const router = express.Router();

// Register a new user
router.post('/new', async (req, res) => {
    try {

        let users = [];

        for (let i = 0; i < req.body.correspondents.length; i++) {
            let user = await User.findOne({ username: req.body.correspondents[i] });
            if (!user) {
                return res.status(400).json({ msg: 'User does not exist' });
            }
            users.push(user);
        }

        let chat = await Chat.findOne({ correspondents: users });

        if (chat) {
            return res.status(400).json({ msg: 'Chat already exists' });
        }

        chat = new Chat({
            name: 'Test',
            correspondents: users
        });

        await chat.save().then(() => {
            res.json(chat);
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
