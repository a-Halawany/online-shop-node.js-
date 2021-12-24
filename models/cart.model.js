const mongoose = require('mongoose');


const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
}, { timestamps: true })

const CartItem = mongoose.model('cart', cartSchema);

const DB_URL = process.env.DATABASE_URI;

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return CartItem.findOne({ productId: data.productId, userId: data.userId })
        }).then(item => {
            if (item) {
                return CartItem.findOneAndUpdate(
                    { productId: data.productId, userId: data.userId },
                    { amount: item.amount + +data.amount }
                )
            } else {
                let item = new CartItem(data);
                return item.save()
            }
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getCartProducts = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return CartItem.find({ userId }, {}, { sort: { updatedAt: -1 } })
        }).then(product => {
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err);
        })
    })
}

exports.updateAmount = (id, amount) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return CartItem.findByIdAndUpdate(id, { amount })
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return CartItem.findByIdAndDelete(id)
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.deleteAll = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return CartItem.deleteMany({ userId })
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getCartById = cartId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return CartItem.findOne({ _id: cartId })
        }).then(cart => {
            mongoose.disconnect()
            resolve(cart)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

