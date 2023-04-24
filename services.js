const {Client}= require('redis-om');
const config =require('./config');
const redis_client=new Client();
const multer =require('multer');

const audioStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./audios');
    },
    filename:(req,file,cb)=>{
        
        
        
        cb(null,Date.now()+'.mp3');
    },
    
});

const uploadAudio=multer({storage:audioStorage});

redis_client.open(config.redis_uri);
module.exports= {redis_client,uploadAudio};