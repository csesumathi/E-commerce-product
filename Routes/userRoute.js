const mongoose=require('mongoose')
const express=require('express')
const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken')

const router=express.Router()
const User=require("../models/usermodel")


router.route('/register').post(async(req,res)=>{
    const {name,email,password}=req.body

    const user= new User({
        name:name,
        email:email,
        password:password
    })

    try{
        const newuser=await user.save()
        res.status(200).send(newuser)
    }catch(err){
        res.send(err)
    }
})

router.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    const user=await User.find({email:email})
    // console.log(user)
    try{
        if(user)
        {

            if(user[0].email==email)
            {
                    let result_pwd=await bcrypt.compare(password,user[0].password)
                    if(result_pwd)
                    {
                        const currentUser={
                            name:user[0].name,
                            email:user[0].email,
                            isVerified:true,
                            _id:user[0]._id
                        }
                        res.send(currentUser)
                    }
                    else{
                        res.status(401).json({message:"password does not match"})
                    }
                }
                else{
                    res.status(403).json({message:"Email incorrect"})
                }
        }
       
        
        
        
        
        
    }catch(error){
        res.status(500).send(error)
    }
    
   

})





module.exports=router



