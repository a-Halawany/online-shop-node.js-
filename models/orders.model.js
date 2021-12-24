const mongoose = require('mongoose');

const CartMoudl = require('./cart.model')

const DB_URL = process.env.DATABASE_URI;

const orderSchema = mongoose.Schema({
    name: String,
    amount: Number,
    price: Number,
    userId: String,
    productId: String,
    address: String,
    status: {
        type: String,
        default: 'pending'
    },
    email: String,
}, { timestamps: true })



const Order = mongoose.model('order', orderSchema)

exports.addOrder = (id, data) => {
    return new Promise((resolve, reject) => {
        CartMoudl.deleteOne(id).then(_ => {
            return mongoose.connect(DB_URL)
        }).then(_ => {
            let order = new Order(data);
            return order.save()
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.addOrders = (userId, data) => {
    return new Promise((resolve, reject) => {
        CartMoudl.deleteAll(userId).then(_ => mongoose.connect(DB_URL)).then(_ => {
            return Order.insertMany(data)
        }).then(_ => {
            resolve()
            mongoose.disconnect()
        }).catch(err => {
            reject(err)
            mongoose.disconnect()
        })
    })
}

exports.getOrders = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return Order.find({ userId }, {}, { sort: { updatedAt: -1 } })
        }).then(orders => {
            resolve(orders)
            mongoose.disconnect()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.cancelOne = (orderId, userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return Order.deleteOne({ _id: orderId, userId })
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.cancelAll = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return Order.deleteMany({ userId, status: "pending" })
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.getMangOrder = _ => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return Order.find({}, {}, { sort: { updatedAt: -1 } })
        }).then(orders => {
            resolve(orders)
            mongoose.disconnect()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}



exports.updateStatusSent = _id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return Order.updateOne({ _id }, { $set: { status: 'sent' } })
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.updateStatusComplete = _id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return Order.updateOne({ _id }, { $set: { status: 'complete' } })
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getMangOrderByStatus = status => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return Order.find({ status }, {}, { sort: { updatedAt: -1 } })
        }).then(orders => {
            resolve(orders)
            mongoose.disconnect()
        }).catch(err => {
            reject(err)
            mongoose.disconnect()
        })
    })
}

