const express = require('express');
const app = express();
const config = require('dotenv').config().parsed
console.log(config)
app.listen(config.PORT,()=>console.log(`server running on port ${config.PORT}`))