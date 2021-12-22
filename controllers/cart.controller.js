const cartModul = require('../models/cart.model')
const flash = require('connect-flash')
const validationResult = require('express-validator').validationResult


exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        let data = {
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.session.userId,
            productId: req.body._id,
        }
        cartModul.addNewItem(data).then(_ => {
            res.redirect('/cart');
        }).catch(err => {
            flash('cartError', err)
            res.redirect(req.body.redirectTo)
        })
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo);
    }
}

exports.getCart = (req, res, next) => {
    let saveError = req.flash('saveError')
    cartModul.getCartProducts(req.session.userId).then(products => {
        res.render('cart', {
            isUser: true, products, saveError, isAdmin: req.session.isAdmin
            , PageTitle: "Cart"
        });
    }).catch(err => {
        res.redirect('/error')
    })
}

exports.updateAmount = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModul.updateAmount(req.body.cartId, req.body.amount).then(_ => {
            res.redirect('/cart');
        }).catch(err => {
            res.redirect('/error')
        })
    } else {
        req.flash('saveError', validationResult(req).array())
        res.redirect('/cart')
    }
}

exports.delete = (req, res, next) => {
    cartModul.deleteOne(req.body.cartId).then(_ => {
        res.redirect('/cart')
    }).catch(err => {
        res.redirect('/error')
    })
}


exports.deleteAll = (req, res, next) => {
    cartModul.deleteAll(req.session.userId).then(_ => {
        res.redirect('/cart')
    }).catch(err => {
        res.redirect('/error')
    })
}

