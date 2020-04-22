const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello App!');
})

app.listen(5000);