const router = require('express').Router();
const bodyParser = require('body-parser')
const check = require('express-validator').check

const authGuard = require('./guards/all.guard')
const orderControll = require('../controllers/order.controller')


router.get('/', authGuard.isAuth, orderControll.getOrders)


router.get('/verify-order', authGuard.isAuth, orderControll.getVerifyOrder)

router.post('/verify-order',
    authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check('address').notEmpty().withMessage('Address Is Required')
    , orderControll.postVerifyOrder
)
router.get('/verify-orders', authGuard.isAuth, orderControll.getVerifyOrders)

router.post('/verify-orders',
    authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check('address').notEmpty().withMessage('Address Is Required')
    , orderControll.postVerifyOrders
)


router.post('/cancelOne', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    orderControll.postCancelOne
)
router.post('/cancelAll', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    orderControll.postcancelAll
)


module.exports = router;