const {Router} =require('express');
const { allAudios, uploadAudioController,audioReqController,reset } =require('./controllers');
const {uploadAudio} =require('./services');
const router=Router()

router.get('/reset',reset);

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/home.html');
})

router.get('/upload',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
router.post('/upload',uploadAudio.single('audio'),uploadAudioController);

router.get('/all',allAudios);
router.get('/audio/:id',audioReqController);

module.exports=router;