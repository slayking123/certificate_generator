const express=require('express');
const app=express.Router();
const sql=require('../database');
app.get('/:slno',function(req,res)
{
    var slno=req.params.slno;
    var query="SELECT * FROM `certificate` WHERE slno="+slno;
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