require('dotenv').config();
const mongoose = require('mongoose');
//Mongo Connection URL
const url = process.env.MONGODB_URL  || "mongodb://127.0.0.1:27017/PMSNL"
//Connecting to DB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongo connection at::",url);
}).catch((e) => {
    console.log(e)
    console.log("Database Connection Failed");
});

