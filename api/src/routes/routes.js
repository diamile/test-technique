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


async function updateMetadata(photoPath, data) {
    await exiftool.write(photoPath, {
        Description: data
    });
}


async function readMetadata(photoPath) {
    try{
     
        const data = await exiftool.read(photoPath);

        return data;
    }catch(err){
        throw err;
    }finally{
       console.log('finally')
    }
}


router.put('/putImage', async (req,res)=>{
    
    await updateMetadata(__dirname+`/../public/data/images/${req.body.file}`, req.body.Description);

    const metadata = await readMetadata(__dirname+`/../public/data/images/${req.body.file}`);
  
    //const result = JSON.stringify(metadata.Description);
  
    return await res.json(metadata)
})


module.exports = router

