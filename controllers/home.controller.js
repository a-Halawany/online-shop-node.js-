const products = require('../models/products.model');

exports.getHome = (req, res, next) => {
    // get products
    // render index.ejs
    let category = req.query.category;
    let productsPromiss;
    let validCategories = ['phones', 'computers', 'clothes'];

    if (category && validCategories.includes(category)) productsPromiss = products.getAllProductsByCategory(category);
    else productsPromiss = products.getAllProducts()

    productsPromiss.then(products => {
        res.render('index', {
            products, isUser: req.session.userId,
            validationError: req.flash('validationErrors'),
            isAdmin: req.session.isAdmin,
            PageTitle: "Home"
        })
    }).catch(err => {
        res.redirect('/error')
    })
}

