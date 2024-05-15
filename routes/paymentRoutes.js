const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../middleware/asyncWrapper');
const {
  createPaymentInvoice,
  paymentStatus,
  paymentDataBase,
} = require('../controllers/paymentControllers');

router.post('/create-invoice', asyncWrapper(createPaymentInvoice));

router.post('/payment-status', asyncWrapper(paymentStatus));
router.get('/', asyncWrapper(paymentDataBase));

module.exports = { paymentRouter: router };
