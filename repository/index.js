const express=require('express');
const app=express();
const sql=require('mysql');
var temp=sql.createConnection(
    {
      host:'localhost',
      user:'root',
      password:'',
      database:'data for certificate generator'
    }
);
/*temp.connect(function(err)
{
    if(err) throw err;
    console.log("db connected");
});*/
const xl=require('xlsx');
var ptr=xl.readFile('student.xlsx');
var worksheet=ptr.Sheets["Sheet1"];
//console.log(worksheet);
var data=[];
var headers={};
for(z in worksheet)
{
   // console.log(z[1]);
  // console.log(worksheet[z].v);
    if (z[0] === "!") continue;
    var col = z.substring(0, 1);
    var row = parseInt(z.substring(1));
    //console.log(row);
    var value = worksheet[z].v;
   // console.log(value);
    if (row == 1) {
        headers[col] = value;
        continue;
    }
    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
}
//console.log(data);
data.shift();
data.shift();
for(let i=0;i<data.length;i++)
{
    temp.query("INSERT INTO `student` (name,branch) VALUES ('"+data[i]["name"]+"','"+data[i]["branch"]+"')",(err,row,field) =>{
       if(!err)
       {
           console.log("data inserted");
       }
       else console.log(err);
    });  
}

