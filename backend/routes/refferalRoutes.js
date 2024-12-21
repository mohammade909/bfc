const express = require('express');
const router = express.Router()
const  { getReferralTree ,getFullReferralTree,calculateCommissionForAllUsers} = require('../controllers/refferalController')
const { updateROIIncomeForUsers } = require('../controllers/CornJobController');


router.get('/list/:referral_code', getReferralTree)
router.get('/full/:referral_code', getFullReferralTree)
router.get('/commission', calculateCommissionForAllUsers)
// router.get('/check', callAllFunctionsSequentially)
router.get('/roi', updateROIIncomeForUsers)



module.exports = router