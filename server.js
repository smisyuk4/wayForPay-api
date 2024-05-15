const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { paymentRouter } = require('./routes/paymentRoutes');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api-wayforpay', paymentRouter);

app.listen(PORT, () => {
  console.log(`My server started on port ${PORT}`);
});
