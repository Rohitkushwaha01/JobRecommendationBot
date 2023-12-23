const express = require("express");
const router = express.Router();
const axios = require('axios');
// const auth = require("../../middleware/auth");
// const UserDetails = require("../../models/UserDetails");
// const User = require("../../models/User");
// const { check, validationResult } = require("express-validator");

router.post('/', async (req, res) => {
    const userInput = req.body.user_input;

    try {
        const response = await axios.post('http://127.0.0.1:5000/chatbot', { user_input: userInput });
        res.json({ response: response.data.response });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;