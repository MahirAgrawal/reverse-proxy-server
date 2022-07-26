const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const needle = require('needle');
router.get('/1',async (req,res) => {
  try{
    const result = await needle("get",process.env.API_BASE_URL);
    res.send(result.body);
  }catch(err){
    console.log({"error":err});
  }
});

router.get('/',(req,res) => {
      needle.get(process.env.API_BASE_URL,(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.send(result.body);
      }
    });
});

router.post('/',async (req,res)=>{
  const data = {
    "code":req.body.code,
    "language":req.body.language,
    "stdin":req.body.stdin
  };
  try{
    const result = await needle("post",process.env.API_BASE_URL,data);
    res.send(result.body);
  }catch(err){
    console.log(err);
  }
})

module.exports = router; 