const express = require('express');
const router = express.Router()
const  {getTransaction,getTransactionById} = require('../controllers/transactionController')

router.post('/list', getTransaction)
router.route('/tr/:user_id')
  .post(getTransactionById)


module.exports = router