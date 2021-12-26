const router = require('express').Router();
const bodyParser = require('body-parser')

const cartController = require('../controllers/cart.controller')
const authGuard = require('./guards/all.guard')
const validatorMW = require('./validator/check.validator')



router.post('/', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    validatorMW.amount,
    cartController.postCart
)

router.get('/', authGuard.isAuth, cartController.getCart)

router.post('/save', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    validatorMW.amount,
    cartController.updateAmount
)

router.post('/delete', authGuard.isAuth, bodyParser.urlencoded({ extended: true }), cartController.delete)


router.post('/deleteAll', authGuard.isAuth, bodyParser.urlencoded({ extended: true }), cartController.deleteAll)




module.exports = router;