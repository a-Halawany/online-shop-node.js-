const express = require('express');
const path = require('path');
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const homeRouter = require('./routes/home.routes');
const productRouter = require('./routes/product.routes')
const authRouter = require('./routes/auth.routes')
const cartRouter = require('./routes/cart.routes')
const orderRouter = require('./routes/order.routes')
const AdminRouter = require('./routes/admin.routes')


const app = express();

// app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use(flash())

const STORE = new SessionStore({
    uri: process.env.DATABASE_URI,
    collection: 'sessions'
})

app.use(session({
    secret: 'this is my secretthis is my secretthis is my secretthis is my secret',
    saveUninitialized: false,
    resave: true,
    store: STORE,
}))

app.set('view engine', 'ejs');
app.set('views', 'views') // Defalut

app.use('/', (req, res, next) => {
    res.set('Content-Type', 'text/plain');
    next()
})

app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/', authRouter)
app.use('/cart', cartRouter)
app.use('/orders', orderRouter)
app.use('/admin', AdminRouter);

app.get('/error', (req, res, next) => {
    res.status(500)
    res.render('error', {
        PageTitle: "Error",
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        content: "Something went wrong"
    })
})

app.get('/Error-admin', (req, res, next) => {
    res.status(403)
    res.render('error', {
        isUser: req.session.userId,
        isAdmin: false,
        PageTitle: "Not-Admin",
        content: "You are not an Admin"
    })
})

app.use((req, res, next) => {
    res.status(404)
    res.render('error', {
        PageTitle: "Page not Found 404",
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        content: " Error 404  Page not found"
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, _ => console.log(`Server is Running on Port : ${PORT}...`));

