const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrderById,
    getMyOrders,
    updateOrderToPaid,
    getAllOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .post(protect, createOrder)
    .get(protect, admin, getAllOrders);

router.get('/myorders', protect, getMyOrders);

router.route('/:id')
    .get(protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);

module.exports = router;
