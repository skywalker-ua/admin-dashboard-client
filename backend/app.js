const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');

const app = express();

// Routing controller
app.use(adminRoutes);

//Connect to MySQL database
sequelize   
    .sync()
    .then(result => {
        console.log('Connected');
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({extended: true}));

app.listen(5000);