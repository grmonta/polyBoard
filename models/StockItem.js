const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  itemNumber: {
    type: String,
    required: true
  },

  createdDate: {
    type: Date,
    default: Date.now
  },
  notes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      name: {
        type: String
      },
      inStockDate: {
        type: String
      },
      issue: {
        type: String
      }
    }
  ]
});

module.exports = StockItem = mongoose.model('stockItem', StockItemSchema);
