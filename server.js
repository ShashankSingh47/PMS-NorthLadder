require('dotenv').config();
require('./db.js');

const express = require('express');
const router = require('./routes/productRoutes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router)

app.get('/*', function (req, res) {
    res.status(404).send("Try Different routes ");
});

// Server started at port
app.listen(port, () => {
    console.log("Server started at port::" + port);
})