const mongoose= require('mongoose');

const Schema= mongoose.Schema

const itemSchema= new Schema({
    title:{
      type:String,
      required:true
    },
    content:{
      type:String,
      required:true
    },
    user_Id: {
      type: String,
      required: true
    }
},{timestamps:true})

module.exports=mongoose.model('Item',itemSchema)

