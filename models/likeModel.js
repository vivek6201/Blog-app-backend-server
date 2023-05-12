const {Schema, default: mongoose} = require("mongoose");

const likeSchema = new Schema({
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
  },
  user:{
    type:String,
    required: true
  },
})

module.exports = mongoose.model("Like",likeSchema);