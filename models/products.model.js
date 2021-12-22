const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://ahmadmamdooh:adminadmin@firstcluster.oy5v2.mongodb.net/online-shop?retryWrites=true&w=majority'

let productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String,
}, { timestamps: true })

const product = mongoose.model('product', productSchema);

exports.getAllProducts = _ => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return product.find({}, {}, { sort: { updatedAt: -1 } })
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        });
    });
}

exports.getAllProductsByCategory = category => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return product.find({ category: category }, {}, { sort: { updatedAt: -1 } })
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        });
    });

}


exports.getProductById = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return product.findById(id)
        }).then(product => {
            mongoose.disconnect()
            resolve(product);
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        });
    })
}


exports.getFirstProduct = _ => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return product.findOne()
        }).then(product => {
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.addProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return product.insertMany(data)
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).then(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.deleteProduct = _id => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return product.deleteOne({ _id })
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}