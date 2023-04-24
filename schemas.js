const { Entity,Schema }= require("redis-om");

class Audio extends Entity{};

const audioSchema=new Schema(Audio,{
    file_name:{type:'string'},
    title:{type:'string'},
    artist:{type:'string'},
    album:{type:'string'}
});
module.exports= {audioSchema};