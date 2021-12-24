const express=require('express');
const app=express.Router();
const sql=require('../database');
const xl=require('xlsx');
app.post('/',function(req,res)
{
    var id=req.body.id;
    var name=req.body.name;
    var worksheetname=req.body.worksheetname;
    var excelsheet=req.body.excelsheet;
var ptr=xl.readFile('../excelsheet/'+excelsheet);
var worksheet=ptr.Sheets[worksheetname];
var data=[];
var headers={};
for(z in worksheet)
{
    if (z[0] === "!") continue;
    var col = z.substring(0, 1);
    var row = parseInt(z.substring(1));
    var value = worksheet[z].v;
    if (row == 1) {
        headers[col] = value;
        continue;
    }
    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
}
data.shift();
data.shift();
for(let i=0;i<data.length;i++)
{
    sql.query("INSERT INTO `certificate` (id,certificatename,studentemail,studentname,branch) VALUES ('"+id+"', '"+name+"', '"+data[i]["email"]+"', '"+data[i]["name"]+"','"+data[i]["branch"]+"')",(err,row,field) =>{
       if(!err)
       {
       }
       else res.json(err);
    }); 
}
res.json(data) 
})
app.get('/:id',function(req,res)
{
    var id=req.params.id;
    var q="SELECT * FROM `certificate` WHERE id='"+id+"'";
    sql.query(q,(err,row,field)=>{
        if(!err){
            res.send(row);
        }
        else throw err;
    });
})
module.exports=app;