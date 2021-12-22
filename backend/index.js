const express=require('express');
const app=express();
const adminroute= require('./router/apiadmincheck');
const transroute=require('./router/transaction')
const generateroute=require('./router/generator')
const student=require('./router/student')
const auth=require('./router/auth')
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(
    function(req,res,next)
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
)
app.use(
    express.json()
)
const temproute=require('./router/template');
app.use('/template',temproute)
app.use('/admin',adminroute)
app.use('/trans',transroute)
app.use('/generate',generateroute)
app.use('/student',student)
app.use('/auth',auth)
app.listen(4000);
