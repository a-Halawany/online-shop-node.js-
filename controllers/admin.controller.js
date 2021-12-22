const orderModul = require('../models/orders.model')
const validationResult = require('express-validator').validationResult
const productModul = require('../models/products.model')

exports.getMangOrder = (req, res, nest) => {
    let status = req.query.status
    if (status && status !== 'all') {
        orderModul.getMangOrderByStatus(status).then(orders => {
            res.render('mangOrders', {
                isUser: true, orders
                , isAdmin: true
                , PageTitle: 'Mang Product',
                searchError: req.flash('searchError')
            })
        }).catch(err => {
            res.redirect('/error')
        })
    } else {
        orderModul.getMangOrder().then(orders => {
            res.render('mangOrders', {
                isUser: true, orders, isAdmin: true,
                PageTitle: 'Mang Product',
                searchError: req.flash('searchError')
            })
        }).catch(err => {
            res.redirect('/error')
        })
    }
}

exports.getOrdersToEmail = (req, res, next) => {
    let status = req.query.status
    let orderPromise;
    if (status && status !== 'all') orderPromise = orderModul.getMangOrderByStatus(status)
    else orderPromise = orderModul.getMangOrder()

    orderPromise.then(orders => {
        return orders.map(e => e.email === req.params.email ? e : "").filter(e => e !== "")
    }).then(orders => {
        res.render('ordersForEmail',
            {
                isUser: true,
                orders,
                isAdmin: true,
                PageTitle: 'Mang Product',
                email: req.params.email,
                searchError: req.flash('searchError')
            })
    }).catch(err => {
        res.redirect('/error')
    })

}



exports.getAddProduct = (req, res, next) => {
    res.render('addProduct', {
        isUser: true,
        isAdmin: true,
        PageTitle: "Add Product",
        productAdded: req.flash('productAdded'),
        validationError: req.flash("validationAddProduct")
    })
}
exports.postAddProduct = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        let data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename,
            category: req.body.category
        }
        productModul.addProduct(data).then(_ => {
            req.flash('productAdded', "Product Added Success..")
            res.redirect('/admin/add-product')
        }).catch(err => {
            res.redirect('/error')
        })
    } else {
        req.flash("validationAddProduct", validationResult(req).array())
        res.redirect('/admin/add-product')
    }
}

exports.deleteProduct = (req, res, next) => {
    productModul.deleteProduct(req.body._id).then(_ => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    }).catch(err => {
        res.redirect('/error')
    })
}

exports.postSent = (req, res, next) => {
    orderModul.updateStatusSent(req.body.id).then(_ => {
        res.redirect('/admin/orders')
    }).catch(err => {
        res.redirect('/error')
    })
}
exports.postComplete = (req, res, next) => {
    orderModul.updateStatusComplete(req.body.id).then(_ => {
        res.redirect('/admin/orders')
    }).catch(err => {
        res.redirect('/error')
    })
}


exports.getEmail = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        res.redirect('/admin/orders/' + req.body.email)
    } else {
        req.flash('searchError', validationResult(req).array())
        res.redirect('/admin/orders')
    }
}