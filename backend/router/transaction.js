const express=require('express')
const app=express.Router();
const sql=require('../database')
const multer=require('multer')
const storage=multer.diskStorage({
    destination:"../excelsheet",
    filename:(function(req,res,cv){
        return cv(null,res.originalname)
    })
})
const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*50
    }
})
app.post('/',upload.single('worksheet'),function(req,res)
{
   res.json({
       success:true,
       url:req.file.path
   })
})
app.post('/db',function(req,res)
{
    const worksheet=req.body.worksheet;
    const excelsheet=req.body.excelsheet;
    const cid=req.body.cid;
    const query='INSERT INTO `transaction` (certificate_id, worksheetname, exelsheetname) VALUES("'+cid+'", "'+worksheet+'", "'+excelsheet+'")'
    sql.query(query,function(err,row,field)
    {
        if(err) throw err;
        else{
            res.send('added!!!!');
        }
    })
})
module.exports=app;
