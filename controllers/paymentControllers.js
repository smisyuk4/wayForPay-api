require('dotenv').config();
const crypto = require('crypto');
const {
  WAY_FOR_PAY_URL,
  MERCHANT_ACCOUNT,
  MERCHANT_DOMAIN_NAME,
  MERCHANT_SECRET_KEY,
} = process.env;

const { addInvoice, getDataBase } = require('../services/paymentServices');

const createPaymentInvoice = async (req, res) => {
  //const {} = req.body;
  const date_order = Date.now();

  const signatureObj = {
    merchantAccount: MERCHANT_ACCOUNT,
    merchantDomainName: MERCHANT_DOMAIN_NAME,
    orderReference: '00003', //Унікальний номер invoice в системі торговця
    orderDate: 1421412898,
    amount: 1,
    currency: 'UAH',
    productName: ['Samsung WB1100F'],
    productCount: [1],
    productPrice: [1],
  };

  const signatureString = Object.values(signatureObj).flat().join(';');

  const hash = crypto
    .createHmac('md5', MERCHANT_SECRET_KEY)
    .update(signatureString)
    .digest('hex');

  const params = {
    ...signatureObj,
    transactionType: 'CREATE_INVOICE',
    merchantSignature: hash,
    apiVersion: 1,
    language: 'UA',
    serviceUrl: 'http://localhost:3000/payment-status',
  };

  //write to db
  addInvoice(params);

  const rawResponse = await fetch(WAY_FOR_PAY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const content = await rawResponse.json();

  res.status(200).json({
    invoice: content,
  });
};

const paymentStatus = async (req, res) => {
  //const {} = req.body;
  console.log(req.body);
  addInvoice(req.body);
  //const dataBase = getDataBase();
  //res.status(200).json(dataBase);
};

const paymentDataBase = async (req, res) => {
  const dataBase = getDataBase();
  res.status(200).json(dataBase);
};

module.exports = {
  createPaymentInvoice,
  paymentStatus,
  paymentDataBase,
};
