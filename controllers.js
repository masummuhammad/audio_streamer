const fs=require('fs/promises');
const fs_cb=require('fs');
const {redis_client} =require('./services');
const { audioSchema } =require('./schemas');
var audioRepositiory;
async function initredis(){
 audioRepositiory=await redis_client.fetchRepository(audioSchema);
 try{
    await audioRepositiory.createIndex();
 }catch{
     console.log('Having trouble to create index.(redis)');
 }
};
initredis();

const reset=async (req,res)=>{
    let allAudioFiles=await audioRepositiory.search().return.all();
    for(let a of allAudioFiles){
    
        await audioRepositiory.remove(a.entityId).catch(err=>console.log(err));
    };
    res.send({data:'reset'});
}
const allAudios=async (req,res)=>{
    
    let allAudioFiles;
    try{
    
        allAudioFiles=await audioRepositiory.search().return.all();
    }catch{
        allAudioFiles="Error in redis-om"
    }
    res.status(200).json({data:allAudioFiles});
};

const uploadAudioController=async(req,res)=>{
    
    if(req.body==undefined)res.send('error');
    else{
        
        let audioData={file_name:req.file.filename,title:req.body.title,artist:req.body.artist,album:req.body.album};
        
    let audiofile=await audioRepositiory.createAndSave(audioData).catch(err=>console.log(err));
    res.status(200).json({data:audiofile});
    };
}


const audioReqController=async(req,res)=>{
        
        const audioFile=await audioRepositiory.fetch(req.params.id).catch(err=>console.log(err));
        
        
        const filePath='./audios/'+audioFile.file_name;
        
        const fileSize=fs_cb.statSync(filePath).size;
        const chunk=10**6;
        const start=Number(req.headers.range.replace(/\D/g,''));
        const end=Math.min(start+chunk,fileSize-1);
        const contentLength=end-start+1;
        const headers={
            'Accept-Ranges':'bytes',
            'Content-Range':`bytes ${start}-${end}/${fileSize}`,
            'Content-Type':'audio/mpeg',
            'Content-Length':contentLength
        };
        res.writeHead(206,headers);
        const stream=fs_cb.createReadStream(filePath,{start,end});
        stream.pipe(res);
    }
    


module.exports= {audioReqController,allAudios,uploadAudioController,reset};