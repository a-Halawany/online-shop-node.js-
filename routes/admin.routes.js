const router = require('express').Router();
const multer = require('multer')
const bodyParser = require('body-parser')

const adminController = require('../controllers/admin.controller')
const authGuard = require('./guards/all.guard')
const validatorMW = require('./validator/check.validator')

router.get('/orders', authGuard.isAuth, authGuard.Admin, adminController.getMangOrder)

router.get('/add-product', authGuard.isAuth, authGuard.Admin, adminController.getAddProduct)

router.post('/add-product', authGuard.isAuth, authGuard.Admin, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }),
}).single('image'),
    validatorMW.image,
    validatorMW.name,
    validatorMW.price,
    validatorMW.description,
    validatorMW.caregory,
    adminController.postAddProduct
)

router.post('/delete-product', authGuard.isAuth, authGuard.Admin, bodyParser.urlencoded({ extended: true })
    , adminController.deleteProduct
)

router.post('/status-sent', authGuard.isAuth,
    authGuard.Admin,
    bodyParser.urlencoded({ extended: true }),
    adminController.postSent
)

router.post('/status-complete', authGuard.isAuth,
    authGuard.Admin,
    bodyParser.urlencoded({ extended: true }),
    adminController.postComplete
)

router.get('/orders/:email', authGuard.isAuth, authGuard.Admin, adminController.getOrdersToEmail)

router.post('/orders/email', authGuard.isAuth, authGuard.Admin,
    bodyParser.urlencoded({ extended: true }),
    validatorMW.email,
    adminController.getEmail
)


module.exports = router;