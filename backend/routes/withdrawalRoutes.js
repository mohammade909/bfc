const express = require('express');
const router = express.Router()
const  {getListOfWithdrawalRequest,addWithdrawalRequest,updateROIWithdrawalRequest,addROIWithdrawalRequest,compoundAmount,withdrawalCompound,updateCompoundWithdrawalRequest,updateWithdrawalRequest,debitAmount,deleteWithdrawalRequest,getListOfWithdrawalRequestById} = require('../controllers/withdrawalController')


router.get('/list', getListOfWithdrawalRequest)
router.get('/by/:user_id', getListOfWithdrawalRequestById)
router.post('/add', addWithdrawalRequest)
router.post('/add/roiwithdrawal', addROIWithdrawalRequest)
router.route('/:id')
  .put(updateWithdrawalRequest)
  .delete(deleteWithdrawalRequest);
router.post("/debit" , debitAmount)
router.put("/compound/amount" , compoundAmount)
router.put("/compound/:id" , updateCompoundWithdrawalRequest)
router.put("/update/roi/:id" , updateROIWithdrawalRequest)
router.post("/addcompoundwithdrawal" , withdrawalCompound)
module.exports = router