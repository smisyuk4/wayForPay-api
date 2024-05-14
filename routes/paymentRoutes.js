const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../middleware/asyncWrapper');
const { xx } = require('../controllers/paymentControllers');

router.get('/', asyncWrapper(xx));

module.exports = { paymentRouter: router };
