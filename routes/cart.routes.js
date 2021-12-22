const router = require('express').Router();
const cartController = require('../controllers/cart.controller')
const bodyParser = require('body-parser')
const authGuard = require('./guards/all.guard')
const check = require('express-validator').check


router.post('/', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check('amount')
        .notEmpty().withMessage("amount is required")
        .isInt({ min: 1 }).withMessage('amount must be grater than 0'),
    cartController.postCart
)

router.get('/', authGuard.isAuth, cartController.getCart)

router.post('/save', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check('amount')
        .notEmpty().withMessage("amount is required")
        .isInt({ min: 1 }).withMessage('amount must be grater than 0')
    , cartController.updateAmount
)

router.post('/delete', authGuard.isAuth, bodyParser.urlencoded({ extended: true }), cartController.delete)


router.post('/deleteAll', authGuard.isAuth, bodyParser.urlencoded({ extended: true }), cartController.deleteAll)




module.exports = router;