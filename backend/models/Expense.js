const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon: {
        type: String
    },
    category: { 
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Default to current date if not provided
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});
module.exports = mongoose.model('Expense', expenseSchema);