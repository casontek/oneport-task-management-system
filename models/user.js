const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username taken.']
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is required.'],
        unique: [true, 'Phone already exist.']
    },
    email: {
        type: String,
        unique: [true, 'Eamil address already exist.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    }
},
{
    timestamps: true
}
);

userSchema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: (doc, ret) => {
        ret.userId = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('User', userSchema);