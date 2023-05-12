const {Schema, default: mongoose} = require("mongoose");

const commentSchema = new Schema({
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
  },
  user:{
    type:String,
    required: true
  },
  body:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model("Comment",commentSchema);