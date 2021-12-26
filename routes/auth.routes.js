const router = require('express').Router();
const bodyParser = require('body-parser');

const authGaurd = require('./guards/all.guard')
const authController = require('../controllers/auth.controller')
const validatorMW = require('./validator/check.validator')

router.get('/login', authGaurd.notAuth, authController.getLogin)
router.post('/login', bodyParser.urlencoded({ extended: true }),
    validatorMW.email,
    validatorMW.password,
    authController.postLogin
)

router.get('/signup', authGaurd.notAuth, authController.getSignup)
router.post('/signup', bodyParser.urlencoded({ extended: true }),
    validatorMW.username,
    validatorMW.email,
    validatorMW.password,
    validatorMW.confirmPassword,
    authController.postSignup)

router.all('/logout', authGaurd.isAuth, authController.logout)

module.exports = router;