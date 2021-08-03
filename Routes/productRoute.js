const express=require("express")
const Product=require('../models/productmodel')
const router=express.Router()
router.use(express.json())

router.route('/newproduct').post(async (req,res)=>{
    
    const newbook=req.body;
    const prod=new Product(newbook)
    
    try{
        const newproduct=await prod.save()
        res.send(newproduct)
        // console.log("success")
    } catch(err){
        // console.log(err)
        res.send(err)
    }
})
router.route('/getallprod').get(async(req,res)=>{
    try{
        const prods=await Product.find({})
        res.send(prods)

    }catch(err){
        res.status(400).send(err)
    }

})








module.exports=router