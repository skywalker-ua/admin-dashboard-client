const Order = require('../models/Order');
const Product = require('../models/Product');

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

exports.getProducts = (req, res, next) => {
    let productsData = [];
    Product.findAll()
        .then(products => {
            productsData = products;
            res.setHeader('Content-Type', 'application/json');
            res.send(productsData)
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postProduct = (req, res, next) => {
    let productData = req.body.product;
    let product = JSON.parse(productData);
    Product.findOrCreate({ where: {
        id: product.id,
        imgUrl: product.imgUrl,
        sku: product.sku,
        category: product.category,
        price: product.price,
        quantity: product.qty
    }})
        .then(([user, created]) => {
            console.log(user)
            if (created) {
                console.log('User aleady exists');
            }
        })
        .catch(err => console.log(err));
    res.send('Product created')
}