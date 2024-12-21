const express = require('express');
const router = express.Router()
const  { reward} = require('../controllers/rewardController')

router.get('/',reward)



module.exports = router