// server/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/validateToken', authenticate, (req, res) => {
    // If the token is valid, the authenticate middleware would allow this route
    // to be accessed, and we simply return a successful response.
    res.status(200).send('Token is valid');
});

// ... other routes

module.exports = router;
