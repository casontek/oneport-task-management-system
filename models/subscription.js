const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    'username': {
        type: String,
        required: [true, 'Username is required.'],
        unique: true
    },
    'callback': {
        type: String,
        required: [true, 'Callback url is required.'],
        unique: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Subscription', subscriptionSchema);