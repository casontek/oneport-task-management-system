const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required.']
    },
    description: {
        type: String
    },
    tags: {
        type: String
    },
    priority: {
        type: String
    }
}, 
{
    timestamps: true
});

taskSchema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: (doc, ret) => {
        ret.taskId = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model("Task", taskSchema);