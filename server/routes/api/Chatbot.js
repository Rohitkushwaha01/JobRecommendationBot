const express = require("express");
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    const userInput = req.body;
    console.log(userInput)

    try {
        const response = await axios.post('http://127.0.0.1:5000/chatbot', userInput);

        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/", async (req, res) => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/flask');
        console.log(response.data)
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;