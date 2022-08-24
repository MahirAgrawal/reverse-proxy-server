const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const needle = require('needle');
router.get('/',(req,res) => {
  res.send({status:"200"});
});

router.post('/',(req,res => {
  res.json({"status":"503","message":"Server in maintainance. Will be up by 25-08-2022"});
}));
router.post('/',async (req,res)=>{
  const data = {
    "code":req.body.code,
    "language":req.body.language,
    "stdin":req.body.stdin,
  };
  try{
    const result = await needle("post",process.env.API_BASE_URL,data);
    res.send(result.body);
  }catch(err){
    res.send({"status":500});
  }
})

module.exports = router; 