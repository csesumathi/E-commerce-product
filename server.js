const express=require('express')
const mongodb= require('mongodb')
const mongoose=require('mongoose')
const cors=require('cors')

//middleware
const app=express()
app.use(express.json())
app.use(cors())

//route declaration

const UserRoute=require("./Routes/userRoute")
const ProductRoute=require("./Routes/productRoute")

/*****DATABASE CONNECTION CODE */
// const DB_url="mongodb+srv://sumathidbUser:*****@cluster0.92l7q.mongodb.net/optisol_productdb?authSource=admin&replicaSet=atlas-rvrgb9-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
const DB_url="mongodb+srv://sumathidbUser:karthi1620@cluster0.92l7q.mongodb.net/optisol_productdb?retryWrites=true&w=majority"
mongoose.connect(DB_url,{
    useFindAndModify:false,
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
})
const db=mongoose.connection;
db.on('open',()=>{
    console.log('database connected')
})

app.use('/api/users',UserRoute)
app.use('/api/product',ProductRoute)

app.get('/',async(req,res)=>{
    res.send("hello ")
    console.log("hello con")
})

const port=process.env.port||3200;

app.listen(port,()=>{console.log(':::server started::')})

