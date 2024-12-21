const express = require('express');
const router = express.Router()
const  {getListOfDeposite,addDeposite,updateDeposite,deleteDeposite,getListOfDepositeById} = require('../controllers/depositeController')


router.get('/list', getListOfDeposite)
router.get('/by/:user_id', getListOfDepositeById)
router.post('/add', addDeposite)
router.route('/:id')
  .put(updateDeposite)
  .delete(deleteDeposite);

module.exports = router