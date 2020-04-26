const express = require('express');

const adminController = require('../controllers/admin');
const router = express.Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})
router.get('/', adminController.getHome);
router.get('/orders', adminController.getOrders);

module.exports = router;