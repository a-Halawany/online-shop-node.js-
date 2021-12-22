const router = require('express').Router();
const check = require('express-validator').check
const multer = require('multer')
const bodyParser = require('body-parser')

const adminController = require('../controllers/admin.controller')
const authGuard = require('./guards/all.guard')

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
    check('image').custom((value, { req }) => {
        if (req.file) return true
        else throw "Image is Required"
    }),
    check('name').notEmpty().withMessage('Name is Required'),
    check('price').notEmpty().withMessage('price is Required')
        .isInt({ min: 1 }).withMessage('the Price should be more than 1 $'),
    check('description').notEmpty().withMessage('Description is Required'),
    check('category').custom((value, { req }) => {
        if (value === 'none') throw "Select a valid Category"
        else return true
    })
    , adminController.postAddProduct
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
    check('email').notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Enter a valid Email!')
    , adminController.getEmail
)


module.exports = router;