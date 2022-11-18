const express =require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.listen(3000, ()=>{
    console.log("listening on 3000");
})

const authorization = (req,res,next)=>{
    const headers = req.headers;
    if(headers.authorization != undefined){
       req.token = headers.authorization;
       next();
    }else{
        res.status(403)
    }
}

app.get('/protected', authorization, (req,res)=>{
    jwt.verify(req.token,'my_secret_key',(err,result)=>{
        if(err){
            res.status(403)
        }else{
            res.status(200).send(result);
        }
    })
    
})

app.post('/login',(req,res)=>{
    const payload = req.body;
    const token = jwt.sign(payload,'my_secret_key');
    res.status(200).send({token: token})

   
})

