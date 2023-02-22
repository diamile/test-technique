const express = require('express');
const app = express();
const config = require('dotenv').config().parsed

const router = require('./routes/routes')

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/api',router)

app.listen(config.PORT,()=>console.log(`server running on port ${config.PORT}`))