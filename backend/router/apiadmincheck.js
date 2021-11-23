const express=require("express")
const app=express.Router();
const sql=require("../database")
// const bp=require("body-parser");
sql.connect(function(err)
{
    if(err) console.log(err)
    else console.log("connected!!")
});
// app.use(
//     express.urlencoded({
//         extended:true
//     })
// )
// app.use(
//     function(req,res,next)
//     {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//         next();
//     }
// )
// app.use(
//     express.json()
// )
app.post('/',function(req,res)
{
    // console.log(req);
  var id=req.body.id;
 // console.log(id);
  var password=req.body.password;
 // console.log(password);
  var query="SELECT * FROM `admin` WHERE id='"+id+"' AND password='"+password+"'";
  sql.query(query,function(err,row,field){
      if(err) throw(err);
      else{
          if(row.length) {res.json({
              result:true,
              message:row
          });
        }
          else {res.json({
              result:false,
              message:'invalid credentials!!!!!!'
          });
        }
      }
  });
});
module.exports=app;
