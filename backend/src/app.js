const express = require('express')
const urlRouter = require('./routes/url.routes')
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', urlRouter);






module.exports = app;