const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check
const authGaurd = require('./guards/all.guard')
const authController = require('../controllers/auth.controller')

router.get('/login', authGaurd.notAuth, authController.getLogin)
router.post('/login', bodyParser.urlencoded({ extended: true }),
    check('email')
        .not().isEmpty().withMessage("Email is Required")
        .isEmail().withMessage("You should Enter Valid Email"),
    check('password').notEmpty().withMessage('password is Required').isLength({ min: 6 }).withMessage("Password should be more than 6 Charct"),
    authController.postLogin)

router.get('/signup', authGaurd.notAuth, authController.getSignup)
router.post('/signup', bodyParser.urlencoded({ extended: true }),
    check("username")
        .not().isEmpty().withMessage("Username is Required"),
    check('email')
        .not().isEmpty().withMessage("Email is Required")
        .isEmail().withMessage("You should Enter Valid Email"),
    check('password').notEmpty().withMessage("Password is Required")
        .isLength({ min: 6 }).withMessage("Length should be more than 6 charcters"),
    check('confirmPassword').custom((value, { req }) => {
        if (value === req.body.password) return true
        else throw "passwords don't Equal"
    }),
    authController.postSignup)

router.all('/logout', authGaurd.isAuth, authController.logout)

module.exports = router;