const express = require("express");
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {
    const userInput = req.body.user_input;

    axios.post('http://127.0.0.1:5000/chatbot', { user_input: userInput })
        .then(response => {
            console.log('Server Response:', response.data.response);
            res.json({ response: response.data.response });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
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