const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');

// Models
const Order = require('./models/Order');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Routing controller
app.use(adminRoutes);

//Connect to MySQL database
sequelize   
    .sync({ force: true })
    .then(result => {
        console.log('Connected');
    })
    .then(() => {
        return Order.create();
    })
    .catch(err => {
        console.log(err);
    });

app.listen(5000);