const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    clientID: String,
    quantity: Number,
    totalPrice: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;