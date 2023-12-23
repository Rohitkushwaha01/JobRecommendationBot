const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

const app = express();

const corsOptions = {
    origin: "*",
    credential: true,
    optionSuccessStatus: 200
}

// connect database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors(corsOptions))


//defining Routes
app.use("/api/user", require("./routes/api/Registration"));
app.use("/api/auth", require("./routes/api/Auth"));
app.use("/api/userdetails", require("./routes/api/UserDetails"));
app.use("/api/chatbot", require("./routes/api/Chatbot"));


app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
})