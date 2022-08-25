const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const needle = require('needle');

router.post('/',async (req,res)=>{
  const data = {
    "code":req.body.code,
    "language":req.body.language,
    "stdin":req.body.stdin
  };
  if(!data.stdin){
    data.stdin = " ";
  }
  try{
    const result = await needle("post",process.env.API_BASE_URL,data);
    res.send(result.body);
  }catch(err){
    res.sendStatus(500).end();
  }
})

module.exports = router; 