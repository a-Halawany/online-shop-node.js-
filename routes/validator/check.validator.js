const check = require('express-validator').check;

// Signup && Login Validator
exports.username = check('username').notEmpty().withMessage("username is required");
exports.email = check('email').notEmpty().withMessage('email is required').isEmail().withMessage("Please enter a Valid Email");
exports.password = check('password').notEmpty().withMessage("password is required").isLength({ min: 6 }).withMessage('Use Strong Password');
exports.confirmPassword = check('confirmPassword').custom((value, { req }) => {
    if (value === req.body.password) return true;
    else throw "check your password again";
})

// Add product to cart
exports.amount = check('amount').notEmpty().withMessage('Enter Valid amount').isInt({ min: 1 }).withMessage("The min amount is one");

// Add Product validator
exports.image = check('image').custom((value, { req }) => {
    if (req.file) return true
    else throw "Image is Required"
});
exports.name = check('name').notEmpty().withMessage('Name is Required')
exports.price = check('price').notEmpty().withMessage('price is Required')
    .isInt({ min: 1 }).withMessage('the Price should be more than 1 $');
exports.description = check('description').notEmpty().withMessage('Description is Required');
exports.caregory = check('category').custom((value, { req }) => {
    if (value === 'none') throw "Select a valid Category"
    else return true
});

// Confirm Address
exports.address = check('address').notEmpty().withMessage('Address Is Required');
