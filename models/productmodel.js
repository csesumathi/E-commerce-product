const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String},
    edition:{type:String},
    Author:{type:String},
    ISBN:{type:String},
    Price:{type:String},
    Description:{type:String}
})

const Product=mongoose.model('Product',productSchema)

module.exports=Product