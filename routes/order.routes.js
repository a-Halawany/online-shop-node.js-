const router = require('express').Router();
const bodyParser = require('body-parser')

const authGuard = require('./guards/all.guard')
const orderControll = require('../controllers/order.controller')
const validatorMW = require('./validator/check.validator')

router.get('/', authGuard.isAuth, orderControll.getOrders)


router.get('/verify-order', authGuard.isAuth, orderControll.getVerifyOrder)

router.post('/verify-order',
    authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    validatorMW.address,
    orderControll.postVerifyOrder
)
router.get('/verify-orders', authGuard.isAuth, orderControll.getVerifyOrders)

router.post('/verify-orders',
    authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    validatorMW.address,
    orderControll.postVerifyOrders
)


router.post('/cancelOne', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    orderControll.postCancelOne
)
router.post('/cancelAll', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    orderControll.postcancelAll
)


module.exports = router;