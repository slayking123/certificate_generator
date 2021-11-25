const express=require('express');
const app=express.Router();
const sql=require('../database');
app.post('/',function(req,res)
{
    var email=req.body.email;
    var query="SELECT * FROM `certificate` WHERE studentemail='"+email+"'";
    sql.query(query,function(error,row,field)
        {
            if(error) throw error;
            else{
                if(!row.length) res.send({
                    message:"certificate not found",
                    success:0
                })
                else{
                    res.send(row)
                }
            }
        })
    })
    module.exports=app
