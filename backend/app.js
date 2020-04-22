const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql2');

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nazarino203',
    database: 'chemiplast_data'
});

pool.query('SELECT * FROM orders', (err, result) => { 
    console.log(result[0]);
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
    res.send('Hello App!');
})

app.listen(5000);