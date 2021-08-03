const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema=mongoose.Schema({
    userId:{type:String},
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    isVerified:{type:Boolean,require:true,default:false},
    resetLink:{
        data:String,
        default:""
    }
})

userSchema.pre("save",async function(next){
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(this.password,salt)
        this.password=hashedpassword;
        next()

    }catch(error){
        console.log(error)
    }
})

const User=mongoose.model('User',userSchema)
module.exports=User