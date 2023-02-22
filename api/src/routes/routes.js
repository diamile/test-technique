const { ConsoleLogger } = require('batch-cluster');
const express = require('express');
const router = express.Router();
const exiftool = require('exiftool-vendored').exiftool;
const fs = require('fs');

let filteToBase64 = [];
let directory =  fs.readdirSync(__dirname+'/../public/data/images');

directory.forEach((file)=>{
    let base64 =  fs.readFileSync(__dirname+'/../public/data/images/'+file).toString('base64');
    filteToBase64.push({base64File:base64,file});
  
})

router.get('/fetchImages', async(req,res)=>{
    let response = filteToBase64.map( (item,index)=>{
        item = {id:index,DEscription:"",commentaire:"", src:`data:image/jpg;base64, ${item.base64File}` ,file:item.file,  fileBase64:item.base64File,show:false};
        return  item;
    }); 
    return await res.json(response)
})



module.exports = router

