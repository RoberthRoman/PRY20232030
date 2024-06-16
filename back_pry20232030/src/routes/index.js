const express = require('express');
const router = express.Router();

const productRoutes = require('./product.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const transactionRoutes = require('./transaction.routes');

router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
