const express=require("express")
const app=express.Router();
const sql=require("../database")
sql.connect(function(err)
{
    if(err) console.log(err)
    else console.log("connected!!")
});
app.get('/',function(req,res)
{
  var query="SELECT * FROM `certificatestemplate`";
  sql.query(query,function(err,row,field){
      if(err) throw(err);
      else{
        res.send(row); 
      }
  });
});
module.exports=app;