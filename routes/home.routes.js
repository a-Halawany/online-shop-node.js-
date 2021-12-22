const router = require('express').Router();
const homeController = require('../controllers/home.controller')
const authGuard = require('./guards/all.guard')



router.get('/', homeController.getHome)


module.exports = router;