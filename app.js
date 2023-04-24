const express=require('express');
const bodyParser=require('body-parser');
const config=require('./config')
const router=require('./routes');
const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('cors')());

app.use(router);

app.listen(config.port,()=>console.log('server started on',config.port));




