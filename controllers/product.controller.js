const products = require('../models/products.model');

exports.getProductById = (req, res, next) => {
    // Get Id 
    // get Product
    // render Page
    let id = req.params.id;

    products.getProductById(id).then(product => {
        res.render('product', {
            product,
            isUser: req.session.userId,
            validationError: req.flash('validationErrors'),
            isAdmin: req.session.isAdmin,
            PageTitle: product === null ? "Product Not Found" : product.name
        });
    }).catch(err => {
        res.redirect('/error')
    })
}
exports.getFirstProduct = (req, res, next) => {
    // Get Id
    // get Product
    // render Page

    products.getFirstProduct().then(product => {
        res.render('product', {
            product, isUser: req.session.userId,
            validationError: req.flash('validationErrors'),
            PageTitle: product.name
        });
    }).catch(err => {
        res.redirect('/error')
    })
}