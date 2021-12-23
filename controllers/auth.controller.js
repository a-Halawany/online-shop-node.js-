const authModle = require('../models/auth.model');
const validationResult = require('express-validator').validationResult

exports.getSignup = (req, res, next) => {
    let authErr = req.flash('authError')
    let validationErr = req.flash('validationError');
    res.render('signup', {
        authErr, validationErr, isUser: req.session.userId, isAdmin: req.session.isAdmin
        , PageTitle: "Signup"
    });
}
exports.getLogin = (req, res, next) => {
    let authErr = req.flash('authError')
    let validationErr = req.flash('loginErr')
    res.render('login', {
        authErr, validationErr, isUser: req.session.userId, isAdmin: req.session.isAdmin
        , PageTitle: 'Login'
    });
}

exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModle
            .createNewUser(req.body.username, req.body.email.toLowerCase(), req.body.password)
            .then(_ => {
                res.redirect('/login')
            }).catch(err => {
                req.flash('authError', err);
                res.redirect('/signup')
            })

    } else {
        req.flash('validationError', validationResult(req).array())
        res.redirect('/signup')
    }
}
exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModle.login(req.body.email.toLowerCase(), req.body.password)
            .then((user) => {
                req.session.isAdmin = user.isAdmin
                req.session.userId = user.id
                req.session.emailId = user.email
                res.redirect('/')
            }).catch(err => {
                req.flash('authError', err);
                res.redirect('/login');
            })
    } else {
        req.flash('loginErr', validationResult(req).array())
        res.redirect('/login')
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy(_ => {
        res.redirect('/')
    })
}