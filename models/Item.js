const mongoose = require('mongoose')
const {Schema} = mongoose

const itemSchema = new Schema(
  {
  name: {type:String, require: true},
  price:{type:Number, require: true},
  picture: {type:String, require: true},
  stock: {type:Boolean, require: true},
  size: {type:String, require: true},
  color: {type:String, require: true},
  description: {type:String, require: true},
  }, {timestamps: true}
)

module.exports = mongoose.model('Item', itemSchema)
