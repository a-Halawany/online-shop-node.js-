const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DB_URL = process.env.DATABASE_URI;

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

let User = mongoose.model('user', userSchema);


exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                mongoose.disconnect()
                reject('Email is used')
            }
            else {
                return bcrypt.hash(password, 10)
            }
        }).then(hashedPassword => {
            let user = new User({
                username,
                email,
                password: hashedPassword
            })
            return user.save()
        }).then(_ => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(_ => {
            return User.findOne({ email: email })
        }).then(user => {
            if (!user) {
                mongoose.disconnect()
                reject("Email Not Found");
            } else {
                bcrypt.compare(password, user.password).then(same => {
                    if (!same) {
                        mongoose.disconnect()
                        reject("Password is incorrect")
                    } else {
                        mongoose.disconnect()
                        resolve(user)
                    }
                })
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}



