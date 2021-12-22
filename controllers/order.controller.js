const validationResult = require('express-validator').validationResult


const ordersModel = require('../models/orders.model')
const cartModul = require('../models/cart.model')


exports.getOrders = (req, res, next) => {
    ordersModel.getOrders(req.session.userId).then(orders => {
        res.render('orders', {
            isUser: true, orders,
            isAdmin: req.session.isAdmin
            , PageTitle: "Orders"
        })
    }).catch(err => {
        res.redirect('/error')
    })
}

exports.getVerifyOrder = (req, res, next) => {
    cartModul.getCartById(req.query.orderId).then(order => {
        res.render('verify-order', {
            PageTitle: "Verify Order",
            isUser: true,
            isAdmin: req.session.isAdmin,
            order,
            addressError: req.flash('addressError')
        })
    }).catch(err => {
        res.redirect('/error')
    })
}
exports.postVerifyOrder = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        let data = {
            name: req.body.name,
            amount: +req.body.amount,
            price: +req.body.price,
            userId: req.body.userId,
            productId: req.body.productId,
            address: req.body.address,
            email: req.session.emailId
        }
        ordersModel.addOrder(req.body._id, data).then(_ => {
            res.redirect('/orders')
        }).catch(err => {
            res.redirect('/error')
        })
    } else {
        req.flash('addressError', validationResult(req).array())
        res.redirect('/orders/verify-order?orderId=' + req.body._id)
    }
}
exports.getVerifyOrders = (req, res, next) => {
    cartModul.getCartProducts(req.session.userId).then(orders => {
        res.render('verify-orders', {
            PageTitle: "Verify Orders",
            isUser: true,
            isAdmin: req.session.isAdmin,
            orders,
            addressError: req.flash('addressError')
        })
    }).catch(err => {
        res.redirect('/error')
    })
}
exports.postVerifyOrders = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        let prepaireData = {},
            data = [];
        for (let i = 0; i < req.body._id.length; i++) {
            prepaireData.name = req.body.name[i]
            prepaireData.amount = +req.body.amount[i]
            prepaireData.price = +req.body.price[i]
            prepaireData.userId = req.body.userId[i]
            prepaireData.productId = req.body.productId[i]
            prepaireData.address = req.body.address
            prepaireData.email = req.session.emailId
            data.push(prepaireData)
            prepaireData = {}
        }
        ordersModel.addOrders(req.session.userId, data).then(_ => {
            res.redirect('/orders')
        }).catch(err => {
            res.redirect('/error')
        })
    } else {
        req.flash('addressError', validationResult(req).array())
        res.redirect('/orders/verify-order?orderId=' + req.body._id)
    }
}

exports.postCancelOne = (req, res, next) => {
    ordersModel.cancelOne(req.body.orderId, req.session.userId).then(_ => {
        res.redirect('/orders')
    }).catch(err => {
        res.redirect('/error')
    })
}

exports.postcancelAll = (req, res, next) => {
    ordersModel.cancelAll(req.session.userId).then(_ => {
        res.redirect('/orders')
    }).catch(err => {
        res.redirect('/error')
    })
}
