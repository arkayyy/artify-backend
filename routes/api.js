const express=require('express')
const router = express.Router()

const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://admin:admin@cluster0.rgwkm.mongodb.net?writeConcern=majority";

const client = new MongoClient(uri,{useUnifiedTopology:true,useNewUrlParser:true});

function isConnected()
{
    return !!client && !!client.topology && client.topology.isConnected()
}

router.get('/',(req,res)=>{
    res.json("HI");
})

router.get('/get-arts',(req,res)=>{
    async function getArts(){
        try{
            if(!isConnected())
            {await client.connect();}
            const db=client.db('ArtGalleryManagement')
            const collection=db.collection('Painting')
            const artsGot=await collection.find().toArray()
            console.log("ARTS FOUND!")
            return res.json({arts: artsGot,error:''})
        }
        catch(err){
            return res.json({error:err.message,arts:[]})
        }
    }
    getArts()
})

router.post('/post-art',(req,res)=>{
    async function postArt(){
        try{
            if(!isConnected())
            {await client.connect();}
            const db=client.db('ArtGalleryManagement')
            const collection=db.collection('Painting')
            const insertionId=await collection.insertOne(req.body)
            console.log("ARTS POSTED!")
            return res.json({insertionId: insertionId,error:''})
        }
        catch(err){
            console.log(err.message)
            return res.json({error:err.message,insertionId:""})
        }
    }
    postArt()
})

router.post('/post-exhibition',(req,res)=>{
    async function postExhibition(){
        try{
            if(!isConnected())
            {await client.connect();}
            const db=client.db('ArtGalleryManagement')
            const collection=db.collection('Exhibition')
            const insertionId=await collection.insertOne(req.body)
            //console.log("ARTS POSTED!")
            return res.json({insertionId: insertionId,error:''})
        }
        catch(err){
            console.log(err.message)
            return res.json({error:err.message,insertionId:""})
        }
    }
    postExhibition()
})


router.post('/post-gallery',(req,res)=>{
    async function postGallery(){
        try{
            if(!isConnected())
            {await client.connect();}
            const db=client.db('ArtGalleryManagement')
            const collection=db.collection('Gallery')
            const insertionId=await collection.insertOne(req.body)
            //console.log("ARTS POSTED!")
            return res.json({insertionId: insertionId,error:''})
        }
        catch(err){
            console.log(err.message)
            return res.json({error:err.message,insertionId:""})
        }
    }
    postGallery()
})

router.get('/get-galleries',(req,res)=>{
    async function getGalleries(){
        try{
            if(!isConnected())
            {await client.connect();}
            const db=client.db('ArtGalleryManagement')
            const collection=db.collection('Gallery')
            const galsGot=await collection.find().toArray()
            //console.log("ARTS FOUND!")
            return res.json({galleries: galsGot,error:''})
        }
        catch(err){
            return res.json({error:err.message,galleries:[]})
        }
    }
    getGalleries()
})

router.get('/get-exhibitions',(req,res)=>{
    async function getExhibitions(){
        try{
            if(!isConnected())
            {await client.connect();}
            const db=client.db('ArtGalleryManagement')
            const collection=db.collection('Exhibition')
            const exGot=await collection.find().toArray()
            //console.log("ARTS FOUND!")
            return res.json({exhibitions: exGot,error:''})
        }
        catch(err){
            return res.json({error:err.message,exhibitions:[]})
        }
    }
    getExhibitions()
})

router.get('/get-customer-details',(req,res)=>{
    async function getCustomerDetails(){
        try{
            //console.log(req.query.c_id)
            if(!isConnected())
            {await client.connect();}
            const db=client.db('ArtGalleryManagement')
            const collection=db.collection('Customer')
            const customerGot=await collection.findOne({c_id: (req.query.c_id).toString()})
            //console.log(customerGot)
            return res.json({details: customerGot,error:''})
        }
        catch(err){
            console.log(err.message)
            return res.json({error:err.message,details:{}})
        }
    }
    getCustomerDetails()
})

module.exports=router
