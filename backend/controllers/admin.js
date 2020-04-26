const Order = require('../models/Order');

exports.getHome = (req, res, next) => {
    res.send('Hi!');
};

exports.getOrders = (req, res, next) => {
    let ordersData = [];
    Order.findAll()
        .then(orders => {
            console.log(JSON.stringify(orders[0]));
            ordersData = orders[0];
            res.setHeader('Content-Type', 'application/json');
            res.send(ordersData);
            res.end();
        })
        .catch(err => {
            console.log(err);
        });
    
}