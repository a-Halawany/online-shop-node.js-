const router = require('express').Router();
const productController = require('../controllers/product.controller')



router.get('/id/:id', productController.getProductById);
router.get('/', productController.getFirstProduct);

module.exports = router;

