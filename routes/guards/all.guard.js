exports.isAuth = (req, res, next) => {
    if (req.session.userId) next()
    else res.redirect('/login');
}
exports.notAuth = (req, res, next) => {
    if (req.session.userId) res.redirect('/')
    else next()
}


exports.Admin = (req, res, next) => {
    if (req.session.isAdmin) next()
    else res.redirect('/Error-admin')
}
