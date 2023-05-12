const {Schema, default: mongoose} = require("mongoose");

const postSchema = new Schema({
  user:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Like"
  }],
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
  }],
  createdAt:{
    type:Date,
    default:Date.now()
  }
}) 

module.exports = mongoose.model("Post",postSchema);